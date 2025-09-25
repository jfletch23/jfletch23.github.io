import type { FaceLandmarkerResult} from "@mediapipe/tasks-vision";
import { eulerFromMatrix4} from "../lib/faceLandmarker.ts";

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
            <h2 className="text-lg font-bold" style={{ color: GREEN }}>
                Live biometric readings
            </h2>
            <p className="text-sm text-white/80">Local, in-browser only. No data saved.</p>

            <div className="mt-4 space-y-4 text-sm">
                <section>
                    <h3 className="font-semibold" style={{ color: GREEN }}>Detection</h3>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        <span className="text-white/70">Face detected:</span>
                        <span>{hasFace ? "Yes" : "No"}</span>

                        <span className="text-white/70">Landmarks:</span>
                        <span>{hasFace ? lm!.length : 0}</span>

                        <span className="text-white/70">Blendshapes:</span>
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
