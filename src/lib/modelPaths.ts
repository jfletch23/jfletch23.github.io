// Resolve asset URLs using Vite's base so subpaths still work.
function localUrl(rel: string) {
    return new URL(`${import.meta.env.BASE_URL}${rel}`, window.location.href).toString();
}

// Self-hosted WASM base (copied from node_modules)
export function getWasmBaseUrl(): string {
    const url = localUrl("mediapipe/wasm/");
    return url.endsWith("/") ? url : `${url}/`;
}

// Self-hosted model
export function getModelUrl(): string {
    return localUrl("models/face_landmarker.task");
}
