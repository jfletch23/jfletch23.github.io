import { useEffect, useRef } from "react";
import type { FaceLandmarkerResult} from "@mediapipe/tasks-vision";

type Props = {
    videoEl: HTMLVideoElement | null;
    result: FaceLandmarkerResult | null;
};

export function FaceOverlay({ videoEl, result }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !videoEl) return;

        const w = videoEl.videoWidth || 1280;
        const h = videoEl.videoHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!result?.faceLandmarks?.length) return;

        const GREEN = "#1ec8c8";
        ctx.fillStyle = GREEN;
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 1;

        const lm = result.faceLandmarks[0];

        // Points
        for (const p of lm) {
            const x = p.x * canvas.width;
            const y = p.y * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 1.7, 0, Math.PI * 2);
            ctx.fill();
        }

        // Quick bounding box
        const xs = lm.map(p => p.x * canvas.width);
        const ys = lm.map(p => p.y * canvas.height);
        const minX = Math.min(...xs), maxX = Math.max(...xs);
        const minY = Math.min(...ys), maxY = Math.max(...ys);
        ctx.globalAlpha = 0.8;
        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
        ctx.globalAlpha = 1;
    }, [result, videoEl]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            width={1280}
            height={720}
        />
    );
}
