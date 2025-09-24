// src/components/RepresentativeCard.tsx
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card";
import { Button } from "./ui/button";
import type {Representative} from "../lib/types.ts";
import {Copy} from "lucide-react";

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
            className={`cursor-pointer mb-2 ${
                selected ? "ring-2 ring-primary" : ""
            }`}
            onClick={onSelect}
        >
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{rep.name}</span>
                    <span className="text-sm text-muted-foreground">{levelLabel}</span>
                </CardTitle>
                <div className="text-sm text-muted-foreground">{rep.office}</div>
            </CardHeader>

            <CardContent className="space-y-2">
                {/* Quick actions */}
                <div className="flex gap-2 mb-2">
                    {rep.emails?.[0] && (
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                        >
                            <a href={`mailto:${rep.emails[0]}`}>Email</a>
                        </Button>
                    )}
                    {((rep.websites && rep.websites.length > 0) ||
                        (rep.contactForms && rep.contactForms.length > 0)) && (
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                        >
                            <a
                                href={
                                    rep.websites?.[0] ||
                                    rep.contactForms?.[0] ||
                                    "#"
                                }
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
                            <strong>Email:</strong>{" "}
                            {rep.emails.map((e, i) => (
                                <span key={i}>
                                    <a href={`mailto:${e}`}>{e}</a>
                                    {i < (rep.emails?.length ?? 0) - 1 && ", "}
                                </span>
                            ))}
                        </div>
                    )}

                    {rep.phones && rep.phones.length > 0 && (
                        <div>
                            <strong>Phone:</strong> {rep.phones.join(", ")}
                        </div>
                    )}

                    {rep.faxes && rep.faxes.length > 0 && (
                        <div>
                            <strong>Fax:</strong> {rep.faxes.join(", ")}
                        </div>
                    )}

                    {rep.addresses && rep.addresses.length > 0 && (
                        <div>
                            <strong>Addresses:</strong>
                            <ul className="ml-4 list-disc">
                                {rep.addresses.map((addr, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span>{addr}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
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
                            <strong>Websites:</strong>{" "}
                            {rep.websites.map((url, i) => (
                                <span key={i}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                            <strong>Contact Forms:</strong>{" "}
                            {rep.contactForms.map((url, i) => (
                                <span key={i}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
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