// src/pages/SourcesPage.tsx
"use client";

export function SourcesPage() {
    return (
        <div className="min-h-screen bg-[#1f1f1f] text-white p-8">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-8 text-teal-500">
                Sources
            </h1>

            {/* Sources Container */}
            <div className="space-y-8">
                {/* Section Block */}
                <section className="bg-[#2a2a2a] rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e3725e]">Images</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>
                            <a
                                href=""
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                            </a>
                        </li>
                        <li>
                            <a
                                href=""
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                            </a>
                        </li>
                    </ul>
                </section>

                {/* Quiz Sources */}
                <section className="bg-[#2a2a2a] rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e3725e]">Quiz</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>
                            Li Qinjun, Cui Tianwei, Zhao Yan, Wu Yuying. Facial Recognition Technology: A Comprehensive Overview. Academic Journal of Computing & Information Science (2023), Vol. 6, Issue 7: 15-26.{" "}
                            <a
                                href="https://doi.org/10.25236/AJCIS.2023.060703"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                https://doi.org/10.25236/AJCIS.2023.060703
                            </a>
                            .
                        </li>
                        <li>
                            P. N. Belhumeur, J. P. Hespanha and D. J. Kriegman, "Eigenfaces vs. Fisherfaces: recognition using class specific linear projection," in IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 19, no. 7, pp. 711-720, July 1997, doi:{" "}
                            <a
                                href="https://ieeexplore.ieee.org/document/598228"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                10.1109/34.598228
                            </a>
                            .
                        </li>
                        <li>
                            L. Sirovich and M. Kirby, "Low-dimensional procedure for the characterization of human faces," J. Opt. Soc. Am. A 4, 519-524 (1987) doi:{" "}
                            <a
                                href="https://opg.optica.org/josaa/fulltext.cfm?uri=josaa-4-3-519&id=2689"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                https://opg.optica.org/josaa/fulltext.cfm?uri=josaa-4-3-519&id=2689
                            </a>
                        </li>
                        <li>
                            “Woodrow Bledsoe Originates Automated Facial Recognition.” History Of Information. Accessed October 3, 2025. {" "}
                            <a
                                href="https://www.historyofinformation.com/detail.php?id=2126"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                https://www.historyofinformation.com/detail.php?id=2126
                            </a>
                            .
                        </li>
                        <li>
                            A. J. Goldstein, L. D. Harmon and A. B. Lesk, "Identification of human faces," in Proceedings of the IEEE, vol. 59, no. 5, pp. 748-760, May 1971, doi:{" "}
                            <a
                                href="https://ieeexplore.ieee.org/document/1450184"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                10.1109/PROC.1971.8254
                            </a>
                            .
                        </li>
                    </ul>
                </section>

                {/* Misc Section */}
                <section className="bg-[#2a2a2a] rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e3725e]">
                        Miscellaneous
                    </h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>
                            API:{" "}
                            <a
                                href=""
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                            </a>
                        </li>
                        <li>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
