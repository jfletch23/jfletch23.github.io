// src/lib/faceLandmarker.ts
import {
    FaceLandmarker,
    FilesetResolver,
    type FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";
import { getWasmBaseUrl, getModelUrl } from "./modelPaths";

let landmarker: FaceLandmarker | null = null;

/**
 * Initialize the MediaPipe Face Landmarker using self-hosted assets.
 * - WASM base:   /mediapipe/wasm/   (copied from node_modules to public/)
 * - Model file:  /models/face_landmarker.task
 */
export async function initFaceLandmarker(): Promise<FaceLandmarker> {
    if (landmarker) return landmarker;

    // Load self-hosted WASM bundle
    const wasmBase = getWasmBaseUrl(); // should end with a trailing slash
    console.info("[face] WASM base:", wasmBase);
    const filesetResolver = await FilesetResolver.forVisionTasks(wasmBase);

    // Load self-hosted model
    const modelUrl = getModelUrl();
    console.info("[face] Model URL:", modelUrl);

    landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: { modelAssetPath: modelUrl },
        numFaces: 1,
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        // NOTE: 'Matrixes' spelling is correct in the JS/TS API.
        outputFacialTransformationMatrixes: true,
    });

    console.info("[face] FaceLandmarker ready");
    return landmarker;
}

export type { FaceLandmarkerResult };

/**
 * Run a detection on the current video frame.
 */
export function detectFace(
    lm: FaceLandmarker,
    videoEl: HTMLVideoElement,
    nowMs: number
): FaceLandmarkerResult | null {
    if (!videoEl.videoWidth || !videoEl.videoHeight) return null;
    return lm.detectForVideo(videoEl, nowMs);
}

/**
 * Convert a 4x4 facial transformation matrix to approximate Euler angles (deg).
 * Useful for displaying head pose (yaw/pitch/roll).
 */
export function eulerFromMatrix4(m: number[]) {
    // Row-major 4x4
    const r00 = m[0];
    const r10 = m[4],  r11 = m[5],  r12 = m[6];
    const r20 = m[8],  r21 = m[9],  r22 = m[10];

    // XYZ convention
    const sy = Math.sqrt(r00 * r00 + r10 * r10);
    let x, y, z;
    if (sy > 1e-6) {
        x = Math.atan2(r21, r22);
        y = Math.atan2(-r20, sy);
        z = Math.atan2(r10, r00);
    } else {
        x = Math.atan2(-r12, r11);
        y = Math.atan2(-r20, sy);
        z = 0;
    }
    const toDeg = (r: number) => (r * 180) / Math.PI;
    return { pitch: toDeg(x), yaw: toDeg(y), roll: toDeg(z) };
}
