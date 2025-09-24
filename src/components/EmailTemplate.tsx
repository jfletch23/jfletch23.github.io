// src/components/EmailTemplate.tsx
import type {Representative} from "../lib/types.ts";
import { Button } from "./ui/button";
import {useEffect, useState} from "react";

type Props = {
    selectedRep: Representative | null;
};

export function EmailTemplate({ selectedRep }: Props) {
    const [text, setText] = useState("");

    useEffect(() => {
        if (selectedRep) {
            setText(
                `Dear ${selectedRep.office} ${selectedRep.name},\n\n` +
                `I am writing to urge you to support stronger protections for privacy, civil liberties, and transparency in government surveillance technologies.\n\n` +
                `Thank you for your time and service.\n\nSincerely,\n[Your Name]`
            );
        } else {
            setText("");
        }
    }, [selectedRep]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).catch(() => {});
    };

    return (
        <div className="space-y-4">
            <h2 className="font-semibold">Email Template</h2>
            {selectedRep ? (
                <>
          <textarea
              className="w-full min-h-[200px] border rounded-md p-2 text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
          />
                    <Button onClick={handleCopy}>Copy to Clipboard</Button>
                </>
            ) : (
                <div className="text-sm text-muted-foreground">
                    Select a representative to load the email template.
                </div>
            )}
        </div>
    );
}