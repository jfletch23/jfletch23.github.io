// src/components/RepresentativeCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Representative } from "../lib/types.ts";
import { Copy } from "lucide-react";

type Props = {
    rep: Representative;
    selected: boolean;
    onSelect: () => void;
};

export function RepresentativeCard({ rep, selected, onSelect }: Props) {
    const levelLabel = rep.level === "federal" ? "Federal" : "State/Local";

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).catch(() => {});
    };

    return (
        <Card
            className={`cursor-pointer mb-2 bg-[#2a2a2a] text-white border border-gray-700 ${
                selected ? "ring-2 ring-white" : ""
            }`}
            onClick={onSelect}
        >
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span className="text-white">{rep.name}</span>
                    <span className="text-sm text-gray-300">{levelLabel}</span>
                </CardTitle>
                <div className="text-sm text-gray-300">{rep.office}</div>
            </CardHeader>

            <CardContent className="space-y-2">
                {/* Quick actions */}
                <div className="flex gap-2 mb-2">
                    {rep.emails?.[0] && (
                        <Button
                            size="sm"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                            className="bg-teal-500 hover:bg-[#e3725e] text-white"
                        >
                            <a href={`mailto:${rep.emails[0]}`}>Email</a>
                        </Button>
                    )}
                    {((rep.websites && rep.websites.length > 0) ||
                        (rep.contactForms && rep.contactForms.length > 0)) && (
                        <Button
                            size="sm"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                            className="bg-teal-500 hover:bg-[#e3725e] text-white"
                        >
                            <a
                                href={rep.websites?.[0] || rep.contactForms?.[0] || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Website
                            </a>
                        </Button>
                    )}
                </div>

                {/* Contact Info */}
                <div className="text-sm space-y-1">
                    {rep.emails && rep.emails.length > 0 && (
                        <div>
                            <strong className="text-white">Email:</strong>{" "}
                            {rep.emails.map((e, i) => (
                                <span key={i}>
                  <a
                      href={`mailto:${e}`}
                      className="underline text-white hover:text-gray-200"
                  >
                    {e}
                  </a>
                                    {i < (rep.emails?.length ?? 0) - 1 && ", "}
                </span>
                            ))}
                        </div>
                    )}

                    {rep.phones && rep.phones.length > 0 && (
                        <div>
                            <strong className="text-white">Phone:</strong>{" "}
                            <span className="text-white">{rep.phones.join(", ")}</span>
                        </div>
                    )}

                    {rep.faxes && rep.faxes.length > 0 && (
                        <div>
                            <strong className="text-white">Fax:</strong>{" "}
                            <span className="text-white">{rep.faxes.join(", ")}</span>
                        </div>
                    )}

                    {rep.addresses && rep.addresses.length > 0 && (
                        <div>
                            <strong className="text-white">Addresses:</strong>
                            <ul className="ml-4 list-disc">
                                {rep.addresses.map((addr, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="text-white">{addr}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white hover:bg-[#3a3a3a]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(addr);
                                            }}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {rep.websites && rep.websites.length > 0 && (
                        <div>
                            <strong className="text-white">Websites:</strong>{" "}
                            {rep.websites.map((url, i) => (
                                <span key={i}>
                  <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-white hover:text-gray-200"
                  >
                    {url}
                  </a>
                                    {i < (rep.websites?.length ?? 0) - 1 && ", "}
                </span>
                            ))}
                        </div>
                    )}

                    {rep.contactForms && rep.contactForms.length > 0 && (
                        <div>
                            <strong className="text-white">Contact Forms:</strong>{" "}
                            {rep.contactForms.map((url, i) => (
                                <span key={i}>
                  <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-white hover:text-gray-200 break-all"
                  >
                    {url}
                  </a>
                                    {i < (rep.contactForms?.length ?? 0) - 1 && ", "}
                </span>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
