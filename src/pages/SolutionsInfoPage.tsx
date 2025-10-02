// src/pages/SolutionsInfoPage.tsx
"use client";
import React from "react";

type Section = {
    title: string;
    bg: string;
    img: string;
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
            img: "Image Placeholder",
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>
                        Synthetic data, or computer-generated faces, can make facial recognition fairer by balancing underrepresented
                        groups.
                    </p>
                    <p>
                        One study found it reduced errors for certain ethnicities and improved fairness across gender and race while
                        keeping accuracy stable
                        <Footnote to="ref-1" label="[1]" />.
                    </p>
                    <p>
                        Another study warned that generative models “lighten skin color of non-white faces and transform female features
                        to be masculine,” showing that synthetic data can also reinforce bias if not carefully designed
                        <Footnote to="ref-2" label="[2]" />.
                    </p>
                    <p>
                        Together, the findings highlight both the promise and the risks: synthetic data can protect privacy and improve
                        fairness, but it can also “serve as a cautionary tale” if the generation process is biased.
                    </p>
                </div>
            ),
        },
        {
            title: "Lighting & Contrast Adjustments",
            bg: "#2a2a2a",
            img: "Image Placeholder",
            imageLeft: false,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>
                        Facial capture and image quality play a huge role in the accuracy of facial recognition technology. In many
                        settings, lighting and contrast are hard to control, and light interacts differently with various skin tones. As
                        a result, face recognition often performs better on some demographic groups than others, raising fairness and
                        ethical concerns.
                    </p>
                    <p>
                        One proposed solution is a group adaptive classifier, which applies different filters and attention to faces
                        depending on demographic attributes, ensuring important features are captured more equally. This method also uses
                        an automated strategy to decide which layers adapt, plus a new loss function to reduce performance gaps. Tests on
                        major datasets show that it improves accuracy for under-represented groups and reduces bias while maintaining
                        overall recognition performance
                        <Footnote to="ref-3" label="[3]" />.
                    </p>
                </div>
            ),
        },
        {
            title: "Regulatory Measures",
            bg: "#1f1f1f",
            img: "Image Placeholder",
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>
                        Facial recognition technology (FRT) collects permanent and personal data, yet there is no overarching U.S.
                        federal law.
                    </p>
                    <p>
                        The Commercial Facial Recognition Privacy Act of 2019, which requires consent for data use, is still under debate
                        six years later
                        <Footnote to="ref-4" label="[4]" />.
                    </p>
                    <p>
                        Illinois’s Biometric Information Privacy Act (BIPA) protects identifiers like fingerprints and facial geometry,
                        prohibiting private entities from profiting on such data and requiring “informed written consent” before
                        collection
                        <Footnote to="ref-5" label="[5]" />.
                    </p>
                    <p>
                        Courts ruled in Rosenbach v. Six Flags that damages must be paid even without proof of harm, a major win for
                        individuals
                        <Footnote to="ref-6" label="[6]" />. However, BIPA does not cover government use. Some cities, like San Francisco
                        and Somerville, have banned government agencies from using FRT, requiring oversight and privacy plans
                        <Footnote to="ref-6" label="[6]" />.
                    </p>
                    <p>
                        Experts stress that Congress must build comprehensive regulation, treating biometric data with the same protection
                        as fingerprints, ensuring consent, oversight, and accountability.
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
                        <div className="w-64 h-40 bg-gray-700 flex items-center justify-center text-gray-300">
                            {section.img && section.img !== "Image Placeholder" ? (
                                <img src={section.img} alt={section.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-300 text-sm">Image Placeholder</span>
                            )}
                        </div>
                    </div>
                );

                const TextBox = (
                    <div className={`md:w-1/2 ${isEven ? "md:pl-8" : "md:pr-8"} self-start`}>
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
                                <div className="md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">{ImageBox}</div>
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
                </ol>
            </div>
        </div>
    );
}
