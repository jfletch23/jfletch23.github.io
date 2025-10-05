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

export function ProblemsInfoPage(): React.ReactElement {
    const sections: Section[] = [
        {
            title: "Consent",
            bg: "#1f1f1f",
            img: "/ConsentGraphic.jpg",
            citation: `Nguyen, P. (2023, December 1). <a href="https://www.bu.edu/articles/2023/consent-culture-what-consent-means-and-how-to-set-personal-boundaries/" target="_blank" class="underline">Consent Culture: What Consent Means and How to Set Personal Boundaries</a>. Boston University.`,
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>
                        Consent has 3 fundamental aspects: manifestation, knowledge, and voluntariness. <Footnote to="ref-1" label="[1]" />
                        F.R.T. violates all 3 of these aspects.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>No opportunity for expression of consent since cameras are constantly recording from afar regardless of whether a user consents or not</li>
                        <li>No knowledge of consent since most people are unaware F.R.T. is being used in places they frequent
                            <ul className="list-[circle] list-inside space-y-1 mt-2 pl-8">
                            <li>Although security cameras are prevalent in our society, it is impossible to know if the video is being fed through a facial recognition model</li>
                            </ul>
                            </li>
                        <li>If consent were asked for, it is likely to be made reflexively as opposed to voluntarily
                            <ul className="list-[circle] list-inside space-y-1 mt-2 pl-8">
                                <li>Most people will feel obligated to consent to F.R.T. if it is the only option to access a specific area where the technology is being deployed</li>
                            </ul></li>
                    </ul>
                    <p>
                        In conclusion, the current state of facial recognition technology does not embody the principles of consent and it is unlikely in the future to embody those principles due to fundamental problems with how the technology works.
                    </p>
                </div>
            ),
        },
        {
            title: "Biases",
            bg: "#2a2a2a",
            img: "/biasIcon.png",
            citation: 'Designed by <a href="https://www.freepik.com/icon/morality_6203283#fromView=search&page=1&position=1&uuid=6c112fda-8f3c-44ba-b59b-48b8b798d0ee" target="_blank" class="underline">Freepik</a>',
            imageLeft: false,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>
                        F.R.T. has been found to be biased especially against marginalized communities.
                        According to a 2019 federal study:<Footnote to="ref-2" label="[2]" />
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Native Americans had the highest rate of false positives in one to one matches </li>
                        <li>African American women had the highest rate of false positives in one to many matches</li>
                        <li>False positives were found to be higher in women than men</li>
                        <li>False positives were found to be higher in the elderly and children</li>
                    </ul>
                    <p>One reason for these biases is the lack of diversity in photos used to train the technology.<Footnote to="ref-3" label="[3]" /></p>
                    <p>These biases are particularly problematic since one of the primary uses of F.R.T. is law enforcement.</p>
                </div>
            ),
        },
        {
            title: "Facial Data can be sold",
            bg: "#1f1f1f",
            img: "/sellingData.png",
            citation: 'Hakizimana, E. I. (2025, March 24). <a href="https://www.linkedin.com/pulse/dark-web-economy-how-cybercriminals-buy-sell-your-personal-data-3avqf/" target="_blank" class="underline">The Dark Web Economy: How Cybercriminals Buy and Sell Your Personal Data</a>. LinkedIn.',
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc list-inside space-y-2">
                        <li>Facial data, just like any other data, can be sold easily</li>
                        <li>This is particularly troublesome since facial data uniquely links to one person</li>
                        <ul className="list-[circle] list-inside space-y-1 mt-2 pl-8">
                            <li>Other data being sold is likely either anonymized or links to a group of people (i.e. expecting mothers).</li>
                        </ul>
                        <li>There are already examples of F.R.T. vendors selling facial data to law enforcement agencies to be used in their databases.</li>
                        <ul className="list-[circle] list-inside space-y-1 mt-2 pl-8">
                            <li>Clearview AI sold access to their tool to law enforcement agencies<Footnote to="ref-4" label="[4]" /></li>
                        </ul>
                    </ul>
                    <p>




                    </p>
                </div>
            ),
        },
        {
            title: "F.R.T. can be used to efficiently deny entry",
            bg: "#1f1f1f",
            img: "/cancel_Icon.png",
            citation: '<a href="https://commons.wikimedia.org/wiki/File:Icons8_flat_cancel.svg" target="_blank" class="underline">Icons8</a>, <a href="http://opensource.org/licenses/mit-license.php" target="_blank" class="underline">MIT</a>, via Wikimedia Commons',
            imageLeft: false,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <ul className="list-disc list-inside space-y-2">
                        <li>Facial recognition technology can also be leveraged to deny entry to certain people based purely on their face</li>
                        <li>While it is true private companies have always been able to deny entry to individuals, using F.R.T. they are now able to do so in much larger numbers and with a higher success rate</li>
                        <li>This is problematic because the ability to efficiently deny entry to individuals using F.R.T. gives unchecked power to private companies to mistreat those they subjectively determine are dissidents</li>
                        <li>The most notable example of this happening is with Madison Square Garden which uses F.R.T. to deny entry to attorneys engaged in active litigation against them<Footnote to="ref-5" label="[5]" /></li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Transparency",
            bg: "#1f1f1f",
            img: "/transparency.png",
            citation: 'Designed by <a href="https://www.freepik.com/icon/transparency_4371115#fromView=keyword&page=1&position=43&uuid=8abaf2f2-65e1-4a66-9f47-67bb4070b06d" target="_blank" class="underline">Freepik</a>',
            imageLeft: true,
            render: (
                <div className="text-lg leading-relaxed space-y-4 text-white">
                    <p>F.R.T has been defined by a lack of transparency.</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>The vendors that provide the technology consider how it works a trade secret</li>
                        <li>It is also often unclear what companies are using what vendors, which makes it hard to know who to direct questions to</li>
                        <li>In addition, there is a lot of obscurity around how faces get into these databases in the first place<Footnote to="ref-6" label="[6]" /></li>
                        <ul className="list-[circle] list-inside space-y-1 mt-2 pl-8">
                            <li>Because F.R.T. vendors scrape billions of images from the Internet, it becomes muddled and unclear what specific website they got a specific image from</li>
                            <li>For example if you found out your face was in a database, you wouldn’t know how to remove your face from the Internet since it would be unclear what website your face was scraped from</li>
                        </ul>
                    </ul>
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
                            <img src={section.img} alt={section.title} className="w-3/5 object-cover" />
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
                        Kim, N. S. (2019). Consentability: Consent and its Limits. Cambridge: Cambridge University Press.
                    </li>
                    <li id="ref-2">
                        Grother, P. , Ngan, M. and Hanaoka, K. (2019), Face Recognition Vendor Test Part 3: Demographic Effects, NIST Interagency/Internal Report (NISTIR), National Institute of Standards and Technology, Gaithersburg, MD, [online],
                        <span className="ml-2">
                            <a href="https://doi.org/10.6028/NIST.IR.8280" className="text-blue-400 underline">
                                https://doi.org/10.6028/NIST.IR.8280{' '}
                            </a>
                            (Accessed October 2, 2025)
                        </span>
                    </li>
                    <li id="ref-3">
                        Grine, Brianna, "The Dangers of Facial Recognition Technology" (2023). Renée Crown University Honors Thesis Projects - All. 1580.
                        <span className="ml-2">
                            <a href="https://surface.syr.edu/honors_capstone/1580" className="text-blue-400 underline">
                                https://surface.syr.edu/honors_capstone/1580{' '}
                            </a>
                        </span>
                    </li>
                    <li id="ref-4">
                        Hill, Kashmir. “The Secretive Company That Might End Privacy as We Know It.” New York Times, January 18, 2020.
                        <span className="ml-2">
                            <a href="https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html" className="text-blue-400 underline">
                                https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html
                            </a>
                            .
                        </span>
                    </li>
                    <li id="ref-5">
                        Hill , Kashmir, and Corey Kilgannon. “Madison Square Garden Uses Facial Recognition to Ban Its Owner’s Enemies.” The New York Times, 22 Dec. 2022,
                        <span className="ml-2">
                            <a href="https://www.nytimes.com/2022/12/22/nyregion/madison-square-garden-facial-recognition.html" className="text-blue-400 underline">
                                https://www.nytimes.com/2022/12/22/nyregion/madison-square-garden-facial-recognition.html
                            </a>
                            .
                        </span>
                    </li>
                    <li id="ref-6">
                        Wiewiórowski, Wojciech. “Facial Recognition: A Solution in Search of a Problem?” European Data Protection Supervisor, 28 Oct. 2019,
                        <span className="ml-2">
                            <a href="https://www.edps.europa.eu/press-publications/press-news/blog/facial-recognition-solution-search-problem_en" className="text-blue-400 underline">
                                https://www.edps.europa.eu/press-publications/press-news/blog/facial-recognition-solution-search-problem_en
                            </a>
                            .
                        </span>
                    </li>
                </ol>
            </div>
        </div>
    );
}