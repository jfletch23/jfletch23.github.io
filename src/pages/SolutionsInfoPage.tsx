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
        className="cursor-pointer align-super text-xs underline text-blue-400 hover:text-blue-300 ml-1"
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
                            Synthetic data is used to balance datasets by generating realistic faces that better represent different races, genders, and ages, improving recognition for groups that are often underrepresented
                            <Footnote to="ref-1" label="[1]" />.
                        </li>
                        <li>
                            It helps protect privacy because systems can be trained without collecting new real facial images, reducing consent and ownership risks
                            <Footnote to="ref-7" label="[7]" />.
                        </li>
                        <li>
                            Researchers use synthetic data to fine-tune algorithms and make facial recognition perform more fairly across different demographics
                            <Footnote to="ref-1" label="[1]" />.
                        </li>
                        <li>
                            The generative AI models used to make synthetic data are not bias-free and can still reproduce issues such as lightening darker skin tones or altering feminine features
                            <Footnote to="ref-2" label="[2]" />.
                        </li>
                        <li>
                            Synthetic data lowers the ethical risks of using real images but may slightly reduce accuracy compared with real world training data
                            <Footnote to="ref-7" label="[7]" />.
                        </li>
                    </ul>

                    <p>
                        Synthetic data is becoming an important tool for creating fairer facial recognition systems. It increases diversity and protects privacy, but it is not free of errors and must be carefully tested and scrutinized before being applied to real world use.
                    </p>
                </div>
            ),
        },
        {
            title: "Mitigating Environmental Biases",
            bg: "#2a2a2a",
            img: "/lightBulb.png",
            citation:
                '<a href="https://commons.wikimedia.org/wiki/File:Light_Bulb_or_Idea_Flat_Icon_Vector.svg" target="_blank" class="underline">Videoplasty.com</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" class="underline">CC BY-SA 4.0</a>, via Wikimedia Commons',
            imageLeft: false,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            Light reflects differently on different skin tones, so cameras don’t always capture features evenly
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Real world settings have shifting light and contrast, which lowers accuracy compared with controlled photos
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Researchers show models can be trained to focus on key facial features more evenly across groups
                            <Footnote to="ref-3" label="[3]" />.
                        </li>
                        <li>
                            Small appearance changes like makeup, facial hair, or expressions can still trip systems up
                            <Footnote to="ref-8" label="[8]" />.
                        </li>
                        <li>
                            New editing aware methods help keep a person’s identity consistent after those changes and improve match rates
                            <Footnote to="ref-8" label="[8]" />.
                        </li>
                    </ul>

                    <p>
                        Improving how faces are captured and how models adapt to real world conditions helps facial recognition work more fairly and accurately for everyone.
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
                            The Commercial Facial Recognition Privacy Act of 2019 is a proposed federal law intended to give individuals more control over their facial data by requiring consent, and it is still being debated in Congress
                            <Footnote to="ref-4" label="[4]" />.
                        </li>
                        <li>
                            Illinois’ Biometric Information Privacy Act (BIPA) protects biometric identifiers like facial geometry, fingerprints, and iris scans, requires written consent, bans selling biometric data, and allows individuals to claim damages even without proving harm
                            <Footnote to="ref-5" label="[5]" /><Footnote to="ref-6" label="[6]" />.
                        </li>
                        <li>
                            Cities such as San Francisco and Somerville, MA, have taken stricter action by banning government use of facial recognition and requiring agencies to submit privacy plans to maintain accountability
                            <Footnote to="ref-6" label="[6]" />.
                        </li>
                    </ul>

                    <p>
                        Biometric data is personal and permanent, and the current patchwork of laws leaves major privacy gaps. A unified federal standard is needed to ensure transparency, informed consent, and consistent protection nationwide.
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
                    <li id="ref-8">
                        Banerjee, S., Mullangi, S. P., Wagle, S., Hegde, C., & Memon, N. (2024). Mitigating the Impact of Attribute Editing on Face Recognition.
                        <em>IEEE International Conference on Biometrics, Theory, Applications and Systems</em>, 1–10.
                        <span className="ml-2">
                            <a
                                href="https://doi.org/10.1109/IJCB62174.2024.10744430"
                                className="text-blue-400 underline"
                                target="_blank"
                            >
                                https://doi.org/10.1109/IJCB62174.2024.10744430
                            </a>
                      </span>
                    </li>
                    <li id="ref-9">
                        McConvey, J. R. (2025, August 25). Fairness in facial recognition hinges on mix of factors, including cultural norms.
                        <em>Biometric Update | Biometrics News, Companies and Explainers.</em> BiometricUpdate.com.
                        <span className="ml-2">
                            <a
                                href="https://www.biometricupdate.com/202508/fairness-in-facial-recognition-hinges-on-mix-of-factors-including-cultural-norms"
                                className="text-blue-400 underline"
                                target="_blank"
                            >
                                https://www.biometricupdate.com/202508/fairness-in-facial-recognition-hinges-on-mix-of-factors-including-cultural-norms
                            </a>
                        </span>
                    </li>
                </ol>
            </div>
        </div>
    );
}
