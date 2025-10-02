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
            title: "Consent",
            text: "Consent has 3 fundamental aspects: manifestation, knowledge, and voluntariness. F.R.T. violates all 3 of these aspects. There is no manifestation of consent with F.R.T. since cameras are constantly recording from afar. In terms of the knowledge aspect, most people are unaware facial recognition technology is being used in places they frequent. This is because there is no way to know if cameras are being used for normal security purposes viewed by a human operator, or if the data is being fed into a facial recognition model and being compared across a database of faces. Lastly, consent must be made voluntarily and not reflexively. Most people will feel obligated to consent to F.R.T. if it is the only option to access a specific area where the technology is being deployed. In conclusion, the current state of facial recognition technology does not embody the principles of consent and it is unlikely in the future to embody those principles due to fundamental problems with how the technology works.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#1f1f1f",
        },
        {
            title: "Biases",
            text: "F.R.T. has been found to be biased especially against marginalized communities. According to a 2019 federal study, Native Americans and African American women had the highest rate of false positives for two different types of F.R.T. One reason for these biases is the lack of diversity in photos used to train the technology. These biases are particularly problematic since one of the primary uses of F.R.T. is law enforcement.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#2a2a2a",
        },
        {
            title: "Facial Data can be sold",
            text: "Facial data, just like any other data can be sold easily. This is particularly troublesome since facial data uniquely links to one person. Other data being sold is likely either anonymized or links to a group of people (i.e. expecting mothers). There are already examples of F.R.T. vendors selling facial data to law enforcement agencies to be used in their databases.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#1f1f1f",
        },
        {
            title: "F.R.T. can be used to efficiently deny entry",
            text: "Facial recognition technology can also be leveraged to deny entry to certain people based purely on their face. While it is true private companies have always been able to deny entry to individuals, they are now able to do so in much larger numbers and with a higher success rate using F.R.T. This is problematic because the ability to efficiently deny entry to individuals using F.R.T. gives unchecked power to private companies to mistreat those they subjectively determine are dissidents.",
            img: "Image Placeholder",
            citation: "Citation placeholder here",
            bg: "#1f1f1f",
        },
        {
            title: "Transparency",
            text: "F.R.T has been defined by a lack of transparency. This is because the vendors that provide the technology consider how it works a trade secret. It is also often unclear what companies are using what vendors, which makes it hard to know who to direct questions to. In addition, there is a lot of obscurity around how faces get into these databases in the first place. Because F.R.T. vendors scrape billions of images from the Internet, it becomes muddled and unclear what specific website they got a specific image from. For example if you found out your face was in a database, you wouldn’t know how to remove your face from the Internet since it would be unclear what website your face was scraped from.",
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
