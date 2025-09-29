"use client";

import React from "react";

type Section = {
    title: string;
    text: string;
    img: string;
    citation: string;
    bg: string;
};

export function ProblemsInfoPage(): React.ReactElement {
    const sections: Section[] = [
        {
            title: "Fair Representation in Datasets",
            text: "Placeholder text for describing how balanced datasets reduce bias.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#1f1f1f",
        },
        {
            title: "Lighting & Contrast Adjustments",
            text: "Placeholder text for discussing how light and contrast metrics can mitigate bias.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#2a2a2a",
        },
        {
            title: "Regulatory Measures",
            text: "Placeholder text for explaining regulations at federal and local levels.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#1f1f1f",
        },
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
