// src/components/EmailTemplate.tsx
import type { Representative } from "../lib/types.ts";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";

type Props = {
    selectedRep: Representative | null;
};

export function EmailTemplate({ selectedRep }: Props) {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);
    const taRef = useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize helper
    const autoResize = () => {
        const ta = taRef.current;
        if (!ta) return;
        ta.style.height = "0px";      // reset first so shrink works too
        ta.style.height = ta.scrollHeight + "px";
    };

    useEffect(() => {
        if (selectedRep) {
            setText(
                `Dear ${selectedRep.office} ${selectedRep.name},\n\n` +
                `I’m writing to ask that you support strong legislation and oversight of facial recognition technology (FRT).\n\n` +
                `The rapid growth of FRT and the personal nature of biometric data makes it critical that our laws and policies keep up.\n\n` +
                `Some states and cities have already taken action — for example, Illinois’ Biometric Information Privacy Act (BIPA) requires written consent before collecting biometric data, and places like San Francisco, CA and Somerville, MA have banned government use of FRT without oversight. These are important steps, but a patchwork of local laws isn’t enough to protect everyone across the country. Whether at the federal, state, or local level, stronger and more consistent protections are urgently needed.\n\n` +
                `I hope lawmakers will build on these frameworks and include an independent oversight panel made up of computer scientists, sociologists, privacy experts, and ethicists. This panel should review any FRT systems before deployment and require:\n\n` +
                `- A clear plan for informed consent and the ability for individuals to withdraw that consent.\n` +
                `- An explanation of how agencies or companies plan to reduce demographic bias in their systems.\n` +
                `- Testing to ensure FRT meets fairness and accuracy standards across all demographics. If the results are too uneven, those systems shouldn’t be allowed in use.\n\n` +
                `This kind of oversight would protect people’s privacy and civil rights while also making sure FRT is used responsibly and fairly. The same rules should apply at every level of government.\n\n` +
                `Thanks so much for your time and for the work you do.\n\n` +
                `Sincerely,\n` +
                `[Your Name]`
            );
        } else {
            setText("");
        }
    }, [selectedRep]);

    // Recalculate height on text change and on mount/resize
    useEffect(() => {
        autoResize();
    }, [text]);

    useEffect(() => {
        const onResize = () => autoResize();
        window.addEventListener("resize", onResize);
        autoResize();
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch { /* ignore */ }
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="font-bold text-[#e3725e] text-4xl">Email Template</h1>
            {selectedRep ? (
                <>
          <textarea
              ref={taRef}
              className="w-full border rounded-lg p-4 text-sm leading-6 text-white bg-[#2a2a2a] border-gray-700 whitespace-pre-wrap font-mono resize-none overflow-hidden"
              value={text}
              onInput={autoResize}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your email will appear here…"
              spellCheck={false}
          />
                    <Button
                        onClick={handleCopy}
                        className="bg-[#e3725e] hover:bg-teal-500 text-white transition-colors"
                    >
                        {copied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                </>
            ) : (
                <div className="text-sm text-white/70">
                    Select a representative to load the email template.
                </div>
            )}
        </div>
    );
}
