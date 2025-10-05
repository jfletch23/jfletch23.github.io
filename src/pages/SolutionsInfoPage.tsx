// src/pages/SolutionsInfoPage.tsx
"use client";
import React from "react";

type Section = {
    title: string;
    bg: string;
    img: string;
    citation?: string;
    imageLeft?: boolean;
    render: React.ReactNode;
};

// Small helper: scroll to a specific reference (e.g., "ref-1")
const Footnote = ({ to, label }: { to: string; label: string }) => (
    <button
        type="button"
        onClick={() => document.getElementById(to)?.scrollIntoView({ behavior: "smooth", block: "start" })}
        className="align-super text-xs underline text-blue-400 hover:text-blue-300 ml-1"
        aria-label={`Jump to ${to}`}
    >
        {label}
    </button>
);

export function SolutionsInfoPage(): React.ReactElement {
    const sections: Section[] = [
        {
            title: "Fair Representation in Datasets",
            bg: "#1f1f1f",
            img: "/fairnessIcon.png",
            citation:
                'Designed by <a href="https://www.freepik.com/icon/legal_9894109#fromView=search&page=1&position=10&uuid=c8db0ab4-9928-4a32-9943-0b60c5009d41" target="_blank" class="underline">Freepik</a>',
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            Expands underrepresented groups by artificially generating balanced data for race, gender, and age, improving recognition accuracy for marginalized demographics
                            <Footnote to="ref-1" label="[1]" />.
                        </li>
                        <li>
                            Protects privacy by reducing the need to collect real facial images, limiting consent and ownership risks
                            <Footnote to="ref-7" label="[7]" />.
                        </li>
                        <li>
                            Uses targeted datasets to fine-tune algorithms and improve fairness across multiple groups
                            <Footnote to="ref-1" label="[1]" />.
                        </li>
                        <li>
                            Not bias-free: generative models can still reproduce issues such as lightening darker skin tones or altering feminine features
                            <Footnote to="ref-2" label="[2]" />.
                        </li>
                        <li>
                            Trade-off: synthetic data can reduce ethical and privacy risks but may lower accuracy compared to models trained on real data
                            <Footnote to="ref-7" label="[7]" />.
                        </li>
                    </ul>

                    <p>
                        Synthetic data offers a promising way to make facial recognition fairer and more ethical by increasing diversity and reducing privacy violations.
                        However, because generation methods can introduce new biases or reduce accuracy, it must be applied carefully to ensure fairness doesn’t come at the cost of reliability.
                    </p>
                </div>
            ),
        },
        {
            title: "Lighting & Contrast Adjustments",
            bg: "#2a2a2a",
            img: "/lightBulb.png",
            citation:
                '<a href="https://commons.wikimedia.org/wiki/File:Light_Bulb_or_Idea_Flat_Icon_Vector.svg" target="_blank" class="underline">Videoplasty.com</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" class="underline">CC BY-SA 4.0</a>, via Wikimedia Commons',
            imageLeft: false,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            Lighting and contrast challenges: light interacts differently with various skin tones, making it harder for cameras to capture facial features evenly
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Real-world inconsistency: in settings like border crossings and commercial areas, lighting changes throughout the day and across locations, unlike the controlled conditions of mugshots
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Group adaptive classifiers: demographic-aware filters and attention layers help capture key features more equally across groups
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Adaptive learning layers: models can automatically decide which parts of the network should adjust to reduce group-specific performance gaps
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Balanced results: tests on major datasets show improved accuracy for underrepresented groups while maintaining overall system reliability
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                    </ul>

                    <p>
                        Improving facial capture means tackling both environmental and algorithmic bias. By combining smarter lighting practices with
                        adaptive models, facial recognition can perform more consistently across skin tones and in contexts where conditions can’t
                        always be controlled.
                    </p>
                </div>
            ),
        },
        {
            title: "Regulatory Measures",
            bg: "#1f1f1f",
            img: "government.png",
            citation:
                'Designed by <a href="https://www.freepik.com/icon/embassy_3061919#fromView=search&page=1&position=3&uuid=19056be9-ddb3-4682-90d5-44f3916a107c" target="_blank" class="underline">Freepik</a>',
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            <strong>Federal:</strong> The Commercial Facial Recognition Privacy Act of 2019 would require consent for collecting and sharing facial data, but it is still under debate and there is no nationwide law yet
                            <Footnote to="ref-4" label="[4]" />.
                        </li>
                        <li>
                            <strong>State:</strong> Illinois BIPA protects biometric identifiers, requires written consent, bans selling biometric data, and allows damages without proof of harm
                            <Footnote to="ref-5" label="[5]" /><Footnote to="ref-6" label="[6]" />.
                        </li>
                        <li>
                            <strong>Local:</strong> San Francisco and Somerville, MA, restrict government use of facial recognition and require privacy plans and allow residents to sue for violations
                            <Footnote to="ref-6" label="[6]" />.
                        </li>
                    </ul>

                    <p>
                        Facial recognition is advancing quickly and biometric data is permanent. The current mix of local and state rules leaves gaps that risk privacy.
                        A unified federal standard is needed to ensure consent, transparency, and accountability across the country.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div id="top" className="w-full min-h-screen">
            {sections.map((section, idx) => {
                const isEven = idx % 2 === 0;

                const ImageBox = (
                    <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
                        {section.img ? (
                            <img src={section.img} alt={section.title} className="w-2/5 object-cover" />
                        ) : (
                            <div className="w-64 h-40 bg-gray-700 flex items-center justify-center text-gray-300">
                                <span className="text-gray-300 text-sm">No Image Provided</span>
                            </div>
                        )}
                        {section.citation && (
                            <p
                                className="mt-2 text-sm text-gray-400"
                                dangerouslySetInnerHTML={{ __html: section.citation }}
                            ></p>
                        )}
                    </div>
                );

                const TextBox = (
                    <div className={`md:w-1/2 ${section.imageLeft ? "md:pl-8" : "md:pr-8"} self-start`}>
                        <h2 className="text-3xl font-bold" style={{ color: isEven ? "#e3725e" : "rgb(20 184 166)" }}>
                            {section.title}
                        </h2>
                        {section.render}
                    </div>
                );

                return (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row items-center justify-between py-16 px-8"
                        style={{ backgroundColor: section.bg }}
                    >
                        {section.imageLeft ? (
                            <>
                                {ImageBox}
                                {TextBox}
                            </>
                        ) : (
                            <>
                                {TextBox}
                                {ImageBox}
                            </>
                        )}
                    </div>
                );
            })}

            {/* References */}
            <div id="references" className="bg-[#2a2a2a] text-white px-8 py-16">
                <h2 className="text-2xl font-bold mb-6">References</h2>
                <ol className="list-decimal list-inside space-y-4 text-sm text-gray-300">
                    <li id="ref-1">
                        Melzi, P., Rathgeb, C., Tolosana, R., Vera-Rodriguez, R., Morales, A., Lawatsch, D., Domin, F., & Schaubert, M.
                        (2024). Synthetic data for the mitigation of demographic biases in face recognition. Proceedings of IJCB 2023.
                        <span className="ml-2">
                            <a href="https://doi.org/10.48550/arXiv.2402.01472" className="text-blue-400 underline">
                                https://doi.org/10.48550/arXiv.2402.01472
                            </a>
                        </span>
                    </li>
                    <li id="ref-2">
                        Jain, N., Olmo, A., Sengupta, S., Manikonda, L., & Kambhampati, S. (2021). Imperfect ImaGANation: Implications of
                        GANs exacerbating biases on facial data augmentation and Snapchat selfie lenses. ICLR 2021 Workshop on Synthetic
                        Data Generation – Quality, Privacy, Bias.
                        <span className="ml-2">
                            <a href="https://doi.org/10.48550/arXiv.2001.09528" className="text-blue-400 underline">
                                https://doi.org/10.48550/arXiv.2001.09528
                            </a>
                        </span>
                    </li>
                    <li id="ref-3">
                        Gong, S., Liu, X., & Jain, A. K. (2021). Mitigating face recognition bias via group adaptive classifier. In CVPR
                        (pp. 3413–3423).
                        <span className="ml-2">
                            <a href="https://doi.org/10.1109/CVPR46437.2021.00342" className="text-blue-400 underline">
                                https://doi.org/10.1109/CVPR46437.2021.00342
                            </a>
                        </span>
                    </li>
                    <li id="ref-4">
                        U.S. Congress. (2019). S.847 — Commercial Facial Recognition Privacy Act of 2019, 116th Congress (2019–2020).
                        <span className="ml-2">
                            <a href="https://www.congress.gov/bill/116th-congress/senate-bill/847" className="text-blue-400 underline">
                                https://www.congress.gov/bill/116th-congress/senate-bill/847
                            </a>
                        </span>
                    </li>
                    <li id="ref-5">
                        Biometric Information Privacy Act, 740 Ill. Comp. Stat. 14/ (2023).
                        <span className="ml-2">
                            <a href="https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004" className="text-blue-400 underline">
                                https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004
                            </a>
                        </span>
                    </li>
                    <li id="ref-6">
                        Wang, X., Wu, Y. C., Zhou, M., & Fu, H. (2024). Beyond surveillance: privacy, ethics, and regulations in face
                        recognition technology. Frontiers in Big Data, 7, 1337465.
                        <span className="ml-2">
                            <a href="https://doi.org/10.3389/fdata.2024.1337465" className="text-blue-400 underline">
                                https://doi.org/10.3389/fdata.2024.1337465
                            </a>
                        </span>
                    </li>
                    <li id="ref-7">
                        Zhao, C. (2025, August 22). Can fake faces make AI training more ethical? <em>Science News</em>.
                        <span className="ml-2">
                            <a href="https://www.sciencenews.org/article/fake-faces-ai-training-ethical" className="text-blue-400 underline">
                                https://www.sciencenews.org/article/fake-faces-ai-training-ethical
                            </a>
                        </span>
                    </li>
                </ol>
            </div>
        </div>
    );
}
