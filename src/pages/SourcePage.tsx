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
                            [Facial recognition hero]. (n.d.). In <em>Facial Recognition Technologies</em>. The Regulatory Review.
                            <a
                                href="https://www.theregreview.org/2024/12/28/seminar-facial-recognition-technologies/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                 https://www.theregreview.org/2024/12/28/seminar-facial-recognition-technologies/
                            </a>
                        </li>
                        <li>
                            Businessman writing on the paper [Vector illustration]. (n.d.). <em>iStock</em>.{" "}
                            <a
                                href="https://www.istockphoto.com/vector/businessman-writing-on-the-paper-gm614448054-106346279"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://www.istockphoto.com/vector/businessman-writing-on-the-paper-gm614448054-106346279
                            </a>
                        </li>
                        <li>
                            Risk management or search for vulnerabilities icon [Vector illustration]. (n.d.). <em>iStock</em>.{" "}
                            <a
                                href="https://www.istockphoto.com/vector/risk-management-or-search-for-vulnerabilities-icon-gm1415463201-463827639"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://www.istockphoto.com/vector/risk-management-or-search-for-vulnerabilities-icon-gm1415463201-463827639
                            </a>
                        </li>
                        <li>
                            Lightbulb icon [Graphic]. (n.d.). <em>Pastoring Potential</em>.{" "}
                            <a
                                href="https://www.pastoringpotential.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://www.pastoringpotential.com/
                            </a>
                        </li>
                        <li>
                            [Man with facial geometry graphic]. (n.d.). In <em>Face Recognition Attendance System</em>. Medium.{" "}
                            <a
                                href="https://medium.com/@professionalcyber/face-recognition-attendance-system-using-opencvand-knn-2024-d9e69ffe9778"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://medium.com/@professionalcyber/face-recognition-attendance-system-using-opencvand-knn-2024-d9e69ffe9778
                            </a>
                        </li>
                        <li>
                            Modern creative concept for searching solutions, brainstorming and planning strategy: Business vector illustration for social media, banner or presentation template [Vector illustration]. (n.d.). <em>iStock</em>.{" "}
                            <a
                                href="https://www.istockphoto.com/vector/modern-creative-concept-for-searching-solutions-brainstorming-and-planning-strategy-gm2091035051-565820340"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://www.istockphoto.com/vector/modern-creative-concept-for-searching-solutions-brainstorming-and-planning-strategy-gm2091035051-565820340
                            </a>
                        </li>
                        <li>
                            [Super professional programmer / project manager graphic]. (n.d.). <em>Freepik</em> (by andrew_derr).{" "}
                            <a
                                href="https://www.freepik.com/premium-vector/vector-illustration-super-professional-programmer-project-manager-funny-cartoon-character_6556944.htm"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                https://www.freepik.com/premium-vector/vector-illustration-super-professional-programmer-project-manager-funny-cartoon-character_6556944.htm
                            </a>
                        </li>
                    </ul>
                </section>

                {/* Quiz Sources */}
                <section className="bg-[#2a2a2a] rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-[#e3725e]">Quiz</h2>
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
