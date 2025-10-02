import { type FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { eulerFromMatrix4 } from "../lib/faceLandmarker.ts";
import { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";

interface TooltipProps {
    children: ReactNode;
    text: ReactNode; // Updated type
}

function Tooltip({ children, text }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="relative inline-block">
            <span onClick={toggleVisibility} className="cursor-pointer">
                {children}
            </span>
            {isVisible && (
                <div className="absolute z-50 p-2 bg-neutral-800 text-white text-sm rounded-lg shadow-lg
                            top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-48 text-left font-normal
                            transition-opacity duration-300 opacity-100">
                    {text}
                </div>
            )}
        </div>
    );
}

type Props = {
    result: FaceLandmarkerResult | null;
};

export function ReadingsPanel({ result }: Props) {
    const GREEN = "#1ec8c8";

    const hasFace = !!result?.faceLandmarks?.length;
    const lm = hasFace ? result!.faceLandmarks[0] : null;
    const matrix = hasFace && result!.facialTransformationMatrixes?.[0]?.data
        ? Array.from(result!.facialTransformationMatrixes[0].data)
        : null;

    const euler = matrix ? eulerFromMatrix4(matrix) : null;

    return (
        <aside className="h-full w-full bg-neutral-900/90 text-white border-l border-white/10 p-4 md:p-6 overflow-y-auto">
            <h2 className="text-lg font-bold" style={{ color: GREEN }} >Purpose</h2>
            <p className="text-sm text-white/80">
                The purpose of this page is to visually illustrate just how much data can be collected from just your face. Try moving your face around to see the Yaw, Pitch, and Roll adjust or try changing facial expressions to see the blendshape scores change!</p>
            <br/>
            <h2 className="text-lg font-bold" style={{ color: GREEN }}>
                Live biometric readings
            </h2>
            <p className="text-sm text-white/80">Local, in-browser only. No data saved.</p>

            <div className="mt-4 space-y-4 text-sm">
                <section>
                    <p className="font-semibold flex items-center" style={{ color: GREEN }}>
                        Detection
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        <span className="text-white/70">Face detected:</span>
                        <span>{hasFace ? "Yes" : "No"}</span>

                        <div className="flex items-center">
                            <span className="text-white/70">Landmarks:</span>
                            <Tooltip text={
                                <span>
                        Landmarks are pre-defined specific characteristics on the face such as eye corners, ear lobes, chin, etc. Click{' '}
                                    <a
                                        href="https://storage.googleapis.com/mediapipe-assets/documentation/mediapipe_face_landmark_fullsize.png"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 underline"
                                    >
                            here
                        </a>
                                    {' '}to see a face with all 478 landmarks labelled.
                    </span>
                            }>
                                <Icon icon="bi:question-circle" className="text-white/60 text-base ml-1 cursor-pointer" />
                            </Tooltip>
                        </div>
                        <span>{hasFace ? lm!.length : 0}</span>

                        <div className="flex items-center">
                            <span className="text-white/70">Blendshapes:</span>
                            <Tooltip text="Blendshapes are coefficients representing facial expressions. Each score value seen in the table below represents a probability score from 0 to 1 of the chance that facial expression is present.">
                                <Icon icon="bi:question-circle" className="text-white/60 text-base ml-1 cursor-pointer" />
                            </Tooltip>
                        </div>
                        <span>{result?.faceBlendshapes?.[0]?.categories?.length ?? 0}</span>
                    </div>
                </section>

                <section>
                    <h3 className="font-semibold" style={{ color: GREEN }}>Head pose (approx)</h3>
                    {euler ? (
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            <span className="text-white/70">Yaw (°):</span><span>{euler.yaw.toFixed(1)}</span>
                            <span className="text-white/70">Pitch (°):</span><span>{euler.pitch.toFixed(1)}</span>
                            <span className="text-white/70">Roll (°):</span><span>{euler.roll.toFixed(1)}</span>
                        </div>
                    ) : (
                        <p className="text-white/70 mt-2">N/A</p>
                    )}
                </section>

                <section>
                    <h3 className="font-semibold" style={{ color: GREEN }}>Sample landmarks (normalized)</h3>
                    {lm ? (
                        <div className="mt-2 max-h-40 overflow-y-auto border border-white/10 rounded">
                            <table className="w-full text-xs">
                                <thead className="bg-black/20 sticky top-0">
                                <tr>
                                    <th className="text-left px-2 py-1">#</th>
                                    <th className="text-left px-2 py-1">x</th>
                                    <th className="text-left px-2 py-1">y</th>
                                    <th className="text-left px-2 py-1">z</th>
                                </tr>
                                </thead>
                                <tbody>
                                {lm.slice(0, 50).map((p, i) => (
                                    <tr key={i} className="odd:bg-white/5">
                                        <td className="px-2 py-1">{i}</td>
                                        <td className="px-2 py-1">{p.x.toFixed(4)}</td>
                                        <td className="px-2 py-1">{p.y.toFixed(4)}</td>
                                        <td className="px-2 py-1">{(p.z ?? 0).toFixed(4)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <p className="text-white/70 mt-2">No landmarks yet</p>}
                    <p className="text-white/60 text-xs mt-1">Showing first 50 / {lm?.length ?? 0}</p>
                </section>

                <section>
                    <h3 className="font-semibold" style={{ color: GREEN }}>Blendshapes</h3>
                    <div className="mt-2 max-h-52 overflow-y-auto border border-white/10 rounded">
                        <table className="w-full text-xs">
                            <thead className="bg-black/20 sticky top-0">
                            <tr>
                                <th className="text-left px-2 py-1">Name</th>
                                <th className="text-left px-2 py-1">Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(result?.faceBlendshapes?.[0]?.categories ?? []).map((c, i) => (
                                <tr key={i} className="odd:bg-white/5">
                                    <td className="px-2 py-1">{c.categoryName}</td>
                                    <td className="px-2 py-1">{c.score.toFixed(3)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </aside>
    );
}