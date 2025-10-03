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
                `I am writing to urge you to support strong legislation and oversight of facial recognition technology (FRT).\n\n` +
                `The rapid advancement of FRT and the deeply personal nature of biometric data make it critical that our laws and policies keep pace.\n\n` +
                `Some states and cities have already taken action, such as Illinois’ Biometric Information Privacy Act (BIPA), which requires informed written consent for the collection of biometric data, and local bans in San Francisco and Somerville on government use of FRT without oversight. These are important steps, but a patchwork of local laws is not enough to protect people across the country. Whether at the federal, state, or local level, comprehensive protections are urgently needed.\n\n` +
                `I ask that leaders establish regulation modeled on these frameworks and include an independent oversight panel made up of computer scientists, sociologists, judicial privacy experts, and ethicists. This panel should review any FRT deployments and require:\n\n` +
                `- A clear plan for informed written consent and the ability for individuals to withdraw consent at any time.\n` +
                `- A detailed explanation of how agencies and companies plan to mitigate demographic biases in their systems.\n` +
                `- Rigorous testing protocols to evaluate whether FRT systems meet fairness and accuracy thresholds across all demographics. If results are too skewed, those systems should not be permitted for use.\n\n` +
                `Such oversight would not only defend the privacy and civil rights of individuals but also ensure that any use of FRT meets standards of fairness, transparency, and accountability. This applies equally to federal, state, and local governments considering FRT adoption.\n\n` +
                `I strongly encourage you to take leadership on this issue and protect communities.\n\n` +
                `Thank you for your time and service.\n\n` +
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
