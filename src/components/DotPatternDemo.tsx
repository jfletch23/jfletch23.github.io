"use client";

import {cn} from "../lib/util.ts";
import {DotPattern} from "./magicui/dot-pattern.tsx";

export function DotPatternDemo() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black -z-10">
            <DotPattern
                glow={true}
                className={cn(
                    "text-green-400",
                    "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                )}
            />
        </div>
    );
}