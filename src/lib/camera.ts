// Simple camera helpers (Safari-safe)
export async function startCamera(
    videoEl: HTMLVideoElement,
    constraints: MediaStreamConstraints = { video: { facingMode: "user" }, audio: false }
): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoEl.srcObject = stream;
    // Safari needs these for inline playback
    videoEl.setAttribute("playsinline", "true");
    videoEl.muted = true;
    await videoEl.play();
    return stream;
}

export function stopCamera(stream?: MediaStream | null) {
    stream?.getTracks().forEach(t => t.stop());
}
