import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
    eyebrow: string;
    headline: ReactNode;
    supporting: string;
}

/** Title-only hero variant used by every page except Home. */
export function PageHero({ eyebrow, headline, supporting }: PageHeroProps) {
    return (
        <section className="border-b border-ink/10 bg-ivory pt-40 pb-24 lg:pt-48 lg:pb-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-widest text-stone uppercase">{eyebrow}</p>
                    <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-ink">
                        {headline}
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">{supporting}</p>
                </Reveal>
            </div>
        </section>
    );
}
