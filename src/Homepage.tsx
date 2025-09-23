import {DotPatternDemo} from "./components/DotPatternDemo.tsx";
import faceSilhouette from "./assets/face-silhouette.png";
import {Link} from "react-router-dom";

export function Homepage() {
    return (
        <section className="relative min-h-screen overflow-hidden">
            <DotPatternDemo />

            {/* FACE — bottom aligned, bigger, half off-screen to the right */}
            <img
                src={faceSilhouette}
                alt=""
                className="
          pointer-events-none select-none
          absolute bottom-0
          right-[-19%]                 /* ~14% off the page; tweak -10%..-20% */
          w-[66vw] md:w-[54vw] lg:w-[48vw]
          max-w-[1100px]
          z-0
          drop-shadow-[0_0_18px_rgba(34,197,94,0.25)]
        "
                style={{
                    objectFit: "contain",
                    filter:
                    // recolor black silhouette to solid emerald-ish green
                        "brightness(0) saturate(100%) invert(49%) sepia(64%) saturate(620%) hue-rotate(90deg) brightness(90%) contrast(92%)",
                }}
            />

            {/* TEXT — sits above the face so it covers the top portion */}
            <div className="relative z-10 px-6 py-24 md:py-32">
                <h1
                    className="
            text-left font-extrabold tracking-tight leading-[0.95]
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-6xl
            text-white
            [--glow:rgba(57,255,20,0.45)]
            drop-shadow-[0_0_10px_var(--glow)]
            md:drop-shadow-[0_0_14px_var(--glow)]
          "
                >
                    <span>Your Face Is</span>
                    <br />
                    <span className="text-[#22c55e]">Your Password</span>
                </h1>

                <p className="mt-6 max-w-2xl text-white/80 text-base md:text-lg">
                    This appears over the dot pattern background
                </p>
            </div>

            {/* BUTTON — overlayed on the face near the bottom */}
            <Link
                to="/ScanPage"
                className="absolute z-10 right-24 md:right-25 bottom-[clamp(6rem,12vh,12rem)]
             inline-flex h-14 px-8 items-center justify-center
             rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-lg"
            >
                Find out more
            </Link>
        </section>
    );
}
