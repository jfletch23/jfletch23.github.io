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
                                href="https://www.epa.gov/international-cooperation/cleaning-electronic-waste"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                EPA – Cleaning up E-Waste
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.ilo.org/global/topics/electrical-and-electronic-waste/lang--en/index.htm"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                International Labour Organization – E-Waste
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
                                href="https://www.epa.gov/international-cooperation/cleaning-electronic-waste"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                EPA – Cleaning up E-Waste
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.ilo.org/global/topics/electrical-and-electronic-waste/lang--en/index.htm"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                International Labour Organization – E-Waste
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
                                href="https://openai.com/api/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                OpenAI API
                            </a>
                        </li>
                        <li>
                            LLM Prompt Examples (internal links or docs)
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
