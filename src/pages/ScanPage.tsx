import { useEffect, useRef, useState } from "react";
import {DotPatternDemo} from "../components/DotPatternDemo.tsx";
import { startCamera, stopCamera } from "../lib/camera.ts";
import { initFaceLandmarker, detectFace, type FaceLandmarkerResult } from "../lib/faceLandmarker.ts";
import { FaceOverlay } from "../components/FaceOverlay.tsx";
import { ReadingsPanel } from "../components/ReadingsPanel.tsx";

// === UI controls ============================================================
const SHOW_TITLE_AND_CTA = false; // <- default OFF so they don't show unexpectedly
type Mode = "always" | "afterConsent" | "afterFace";
const UI_VISIBILITY_MODE: Mode = "afterConsent"; // switch to 'afterFace' to show only when landmarks exist
const DEBUG = true; // set to false to hide the status pill
// ===========================================================================

export function ScanPage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const landmarkerRef = useRef<any>(null);

    const [consented, setConsented] = useState(false);
    const [result, setResult] = useState<FaceLandmarkerResult | null>(null);
    const facePresent = (result?.faceLandmarks?.[0]?.length ?? 0) > 0;

    const GREEN = "#1ec8c8";

    // Control when headline/CTA are visible
    const uiVisible =
        SHOW_TITLE_AND_CTA &&
        (
            UI_VISIBILITY_MODE === "always" ||
            (UI_VISIBILITY_MODE === "afterConsent" && consented) ||
            (UI_VISIBILITY_MODE === "afterFace" && consented && facePresent)
        );

    useEffect(() => {
        if (!consented) return;

        let running = true;

        (async () => {
            const videoEl = videoRef.current!;
            // 1) Start camera
            streamRef.current = await startCamera(videoEl, { video: { facingMode: "user" }, audio: false });

            // 2) Make sure video dimensions are ready
            await new Promise<void>((resolve) => {
                if (videoEl.readyState >= 2 && videoEl.videoWidth > 0) return resolve();
                const onLoaded = () => { videoEl.removeEventListener("loadedmetadata", onLoaded); resolve(); };
                videoEl.addEventListener("loadedmetadata", onLoaded);
            });

            // 3) Init model
            try {
                landmarkerRef.current = await initFaceLandmarker();
            } catch (e) {
                console.error("Failed to init FaceLandmarker", e);
                alert("Could not load the face model. Check /public/models/face_landmarker.task and your network.");
                return;
            }

            // 4) Loop
            const loop = () => {
                if (!running) return;
                const now = performance.now();
                const r = detectFace(landmarkerRef.current, videoEl, now);
                if (r) setResult(r);
                rafRef.current = requestAnimationFrame(loop);
            };
            loop();
        })();

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            stopCamera(streamRef.current);
        };
    }, [consented]);

    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            {/* Keep the dot background behind everything */}
            <div className="absolute inset-0 -z-20 pointer-events-none">
                <DotPatternDemo />
            </div>

            {/* Grid: camera (2/3) | readings (1/3) */}
            <div className="relative z-0 grid grid-cols-1 md:grid-cols-3 min-h-screen">
                {/* CAMERA + OVERLAY */}
                <div className="relative md:col-span-2">
                    <div className="relative w-full h-[60vh] md:h-screen bg-black/60">
                        <video
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                        />
                        <FaceOverlay videoEl={videoRef.current} result={result} />
                    </div>

                    {/* Optional headline/CTA (hidden by default) */}
                    {uiVisible && (
                        <>
                            <div className="absolute top-6 left-6 z-20">
                                <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(34,197,94,0.25)]">
                                    <span>Your Face Is</span><br />
                                    <span style={{ color: GREEN }}>Your Password</span>
                                </h1>
                            </div>

                            <a
                                href="/scan"
                                className="absolute z-20 right-6 bottom-[clamp(5rem,14vh,12rem)]
                           inline-flex h-12 md:h-14 px-6 md:px-8 items-center justify-center
                           rounded-xl bg-neutral-800 hover:bg-neutral-700
                           text-white text-base md:text-lg shadow-lg shadow-black/30"
                            >
                                Find out more
                            </a>
                        </>
                    )}

                    {/* Debug status (helps pinpoint why you see no data) */}
                    {DEBUG && (
                        <div className="absolute left-4 bottom-4 z-20 text-xs text-white/80 bg-black/60 px-2 py-1 rounded">
                            video:{videoRef.current?.videoWidth ? "ready" : "waiting"} ·
                            model:{landmarkerRef.current ? "ready" : "loading"} ·
                            landmarks:{result?.faceLandmarks?.[0]?.length ?? 0}
                        </div>
                    )}
                </div>

                {/* READINGS PANEL */}
                <div className="md:col-span-1">
                    <ReadingsPanel result={result} />
                </div>
            </div>

            {/* CONSENT MODAL (only thing visible at first) */}
            {!consented && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur">
                    <div className="max-w-lg w-[92%] rounded-2xl border border-white/10 bg-neutral-900 p-6">
                        <h2 className="text-xl font-bold" style={{ color: GREEN }}>
                            Camera consent & privacy
                        </h2>
                        <p className="mt-3 text-white/80 text-sm leading-relaxed">
                            This demo runs <span className="text-white">entirely in your browser</span>.
                            Video and biometric readings are processed locally and{" "}
                            <span className="text-white">not saved or uploaded</span>. Click “Start camera”
                            to allow your browser to access the camera and see what face trackers collect.
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <button
                                onClick={() => setConsented(true)}
                                className="inline-flex items-center justify-center h-11 px-5 rounded-xl
                           bg-teal-500 hover:bg-[#e3725e] text-white font-semibold"
                            >
                                Start camera
                            </button>
                            <a href="/learn" className="text-white/70 hover:text-white text-sm underline">
                                Learn more first
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
