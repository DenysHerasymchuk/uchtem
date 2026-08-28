import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface BreakdownItem {
    title: string;
    body: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface ServiceBreakdownProps {
    eyebrow: string;
    headline: string;
    items: BreakdownItem[];
}

export function ServiceBreakdown({ eyebrow, headline, items }: ServiceBreakdownProps) {
    return (
        <section className="bg-ivory py-24 lg:py-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-widest text-stone uppercase">{eyebrow}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] text-ink">
                        {headline}
                    </h2>
                </Reveal>

                <div className="mt-14 divide-y divide-ink/10 border-t border-ink/10">
                    {items.map((item, i) => (
                        <Reveal key={item.title} delay={0.06 * i}>
                            <div className="group grid grid-cols-1 gap-3 py-8 transition-colors duration-300 sm:grid-cols-[2.5rem_1fr_2fr] sm:items-start sm:gap-10 sm:hover:bg-ink/[0.025]">
                                <item.icon className="hidden size-6 text-brass transition-transform duration-300 group-hover:-translate-y-0.5 sm:block" />
                                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                                <p className="max-w-xl text-stone leading-relaxed">{item.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
