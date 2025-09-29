// src/pages/LandingPage.tsx
"use client";

import { Card, CardContent } from "../components/ui/card.tsx";
import {Link} from "react-router-dom";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#1f1f1f] text-white flex flex-col">
            {/* Top Teal Band */}
            <div className="w-full h-2 bg-teal-500" />

            {/* Hero Banner */}
            <section
                className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('/FaceBanner.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-white">
                    Facing The Future
                </h1>
            </section>

            {/* Bottom Teal Band */}
            <div className="w-full h-2 bg-teal-500" />

            {/* Mission Statement */}
            <section className="py-16 px-6 md:px-20 text-center bg-[#1f1f1f]">
                <h2 className="text-3xl font-bold text-[#e3725e] mb-6">Our Mission</h2>
                <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    We strive to harness technology responsibly, balancing innovation with
                    ethical design, and shaping the future of human-AI collaboration in
                    ways that are inclusive, transparent, and fair.
                </p>
            </section>

            {/* 3 Columns Section */}
            <section className="py-16 px-6 md:px-20 bg-[#2a2a2a]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            src: "/LetterRep.jpg",
                            title: "Write Your Rep",
                            text: "Auto-generate letters and send with one click.",
                            href: "/Representatives",
                        },
                        {
                            src: "/quiz.png",
                            title: "Test Your Knowledge!",
                            text: "Learn some surprising facts about facial recognition technology",
                            href: "/Quiz",
                        },
                        {
                            src: "/Scan.jpeg",
                            title: "Live Scan",
                            text: "Try the demo and view landmark overlays.",
                            href: "/ScanPage",
                        },
                    ].map((item, i) => (
                        <Link key={i} to={item.href} className="block group">
                            <Card className="bg-[#1f1f1f] border border-gray-700 rounded-2xl shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]">
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                                    />
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-[#EAB308] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400">{item.text}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 md:px-20 bg-[#2a2a2a]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            src: "/ProblemsIcon.jpg",
                            title: "Problems Info",
                            text: "Investigate the current issues with facial recognition technology",
                            href: "/ProblemsPage",
                        },
                        {
                            src: "/SolutionsIcon.jpg",
                            title: "Solutions Info",
                            text: "Explore ways to improve facial recognition technology",
                            href: "/SolutionsPage",
                        },
                        {
                            src: "/SourcesIcon.png",
                            title: "Sources",
                            text: "Read about our sources",
                            href: "/SourcesPage",
                        },
                    ].map((item, i) => (
                        <Link key={i} to={item.href} className="block group">
                            <Card className="bg-[#1f1f1f] border border-gray-700 rounded-2xl shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]">
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <img
                                        src={item.src}
                                        alt={item.title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                                    />
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-semibold text-[#EAB308] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400">{item.text}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
