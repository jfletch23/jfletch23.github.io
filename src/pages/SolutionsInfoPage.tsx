// src/pages/SolutionsInfoPage.tsx
"use client";

import React from "react";

type Section = {
    title: string;
    text: string;
    img: string;
    citation: string;
    bg: string;
};

export function SolutionsInfoPage(): React.ReactElement {
    const sections: Section[] = [
        {
            title: "Fair Representation in Datasets",
            text: "Synthetic data, or computer-generated faces, can make facial recognition fairer by balancing underrepresented groups. " +
                "One study found it reduced errors for certain ethnicities and improved fairness across gender " +
                "and race while keeping accuracy stable (Melzi et al., 2024). Another study warned that generative " +
                "models 'lighten skin color of non-white faces and transform female features to be masculine,' " +
                "showing that synthetic data can also reinforce bias if not carefully designed (Jain et al., 2021). " +
                "Together, the findings highlight both the promise and the risks: synthetic data can protect privacy " +
                "and improve fairness, but it can also 'serve as a cautionary tale' if the generation process is biased.",
            img: "placeHolder",
            citation: "Melzi et al., 2024; Jain et al., 2021",
            bg: "#1f1f1f",
        },
        {
            title: "Lighting & Contrast Adjustments",
            text: "Facial capture and image quality play a huge role in the accuracy of facial recognition technology. " +
                "In many settings, lighting and contrast are hard to control, and light interacts differently with various skin tones. " +
                "As a result, face recognition often performs better on some demographic groups than others, raising fairness and ethical concerns. " +
                "One proposed solution is a group adaptive classifier, which applies different filters and attention to faces depending on demographic attributes, " +
                "ensuring important features are captured more equally. This method also uses an automated strategy to decide which layers adapt, " +
                "plus a new loss function to reduce performance gaps. Tests on major datasets show that it improves accuracy for under-represented groups " +
                "and reduces bias while maintaining overall recognition performance (Gong, Liu, & Jain, 2021).",
            img: "Image Placeholder",
            citation: "Gong, Liu, & Jain, 2021",
            bg: "#2a2a2a",
        },
        {
            title: "Regulatory Measures",
            text: "Facial recognition technology (FRT) collects permanent and personal data, yet there is no overarching U.S. federal law. " +
                "The Commercial Facial Recognition Privacy Act of 2019, which requires consent for data use, is still under debate six years later " +
                "(U.S. Congress, 2019). Illinois’s Biometric Information Privacy Act (BIPA) protects identifiers like fingerprints and facial geometry, " +
                "prohibiting private entities from profiting on such data and requiring 'informed written consent' before collection (Biometric Information Privacy Act, 2023). " +
                "Courts ruled in Rosenbach v. Six Flags that damages must be paid even without proof of harm, a major win for individuals (Wang, 2024). " +
                "However, BIPA does not cover government use. Some cities, like San Francisco and Somerville, have banned government agencies from using FRT, " +
                "requiring oversight and privacy plans (Wang, 2024). Experts stress that Congress must build comprehensive regulation, treating biometric data " +
                "with the same protection as fingerprints, ensuring consent, oversight, and accountability.",
            img: "Image Placeholder",
            citation: "U.S. Congress, 2019; Biometric Information Privacy Act, 2023; Wang, 2024",
            bg: "#1f1f1f",
        }

    ];

    return (
        <div className="w-full min-h-screen">
            {sections.map((section, idx) => {
                const isEven = idx % 2 === 0;

                return (
                    <div
                        key={idx}
                        className="flex flex-col md:flex-row items-center justify-between py-16 px-8"
                        style={{ backgroundColor: section.bg }}
                    >
                        {/* Image on left for even, on right for odd */}
                        {isEven ? (
                            <>
                                {/* Image */}
                                <div className="md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0">
                                    <div className="w-64 h-40 bg-gray-700 flex items-center justify-center text-gray-300">
                                        {section.img}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">{section.citation}</p>
                                </div>
                                {/* Text */}
                                <div className="md:w-1/2 text-white space-y-4 md:pl-8 self-start">
                                    <h2
                                        className="text-3xl font-bold"
                                        style={{ color: isEven ? "#e3725e" : "rgb(20 184 166)" }}
                                    >
                                        {section.title}
                                    </h2>
                                    <p className="text-lg">{section.text}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Text */}
                                <div className="md:w-1/2 text-white space-y-4 md:pr-8 self-start">
                                    <h2
                                        className="text-3xl font-bold"
                                        style={{ color: isEven ? "#e3725e" : "rgb(20 184 166)" }}
                                    >
                                        {section.title}
                                    </h2>
                                    <p className="text-lg">{section.text}</p>
                                </div>
                                {/* Image */}
                                <div className="md:w-1/2 flex flex-col items-center justify-center mt-8 md:mt-0">
                                    <div className="w-64 h-40 bg-gray-700 flex items-center justify-center text-gray-300">
                                        {section.img}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">{section.citation}</p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
