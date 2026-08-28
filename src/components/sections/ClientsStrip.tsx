import { Reveal } from "@/components/ui/Reveal";

// Placeholder wordmarks for demo purposes only — invented names, not real
// businesses. Logotypes conventionally stay untranslated across locales.
const CLIENTS = [
    { name: "Northfield", color: "#b99a5b" },
    { name: "Velara Group", color: "#3c6e5c" },
    { name: "Orbit & Co.", color: "#6b5b95" },
    { name: "Stonehaven", color: "#a45c5c" },
    { name: "Meridian Works", color: "#5b7c99" },
    { name: "Atlasworks", color: "#8c8354" },
];

export function ClientsStrip() {
    const row = (
        <div className="flex shrink-0 items-center gap-16 pr-16">
            {CLIENTS.map((client) => (
                <span key={client.name} style={{ color: client.color }} className="font-display text-xl whitespace-nowrap italic lg:text-2xl">
                    {client.name}
                </span>
            ))}
        </div>
    );

    return (
        <Reveal className="overflow-hidden border-y border-ink/10 bg-ivory py-10 lg:py-12">
            <div className="animate-marquee flex w-max items-center">
                {row}
                {row}
            </div>
        </Reveal>
    );
}
