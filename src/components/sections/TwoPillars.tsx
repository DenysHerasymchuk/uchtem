import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BarChart01, Compass01 } from "@untitledui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { MinimalLineChart } from "@/components/data-viz/MinimalLineChart";
import { useLocalizedPath } from "@/i18n/locale";

const LEDGER_ROWS = [3, 6, 4, 9, 7, 12, 9, 16];

interface PillarCopy {
    eyebrow: string;
    title: string;
    tagline: string;
    body: string;
    cta: string;
}

export function TwoPillars() {
    const { t } = useTranslation("home");
    const lp = useLocalizedPath();

    const pillars: { copy: PillarCopy; to: string; theme: "ink" | "graphite"; icon: typeof BarChart01 }[] = [
        { copy: t("twoPillars.pillarOne", { returnObjects: true }) as PillarCopy, to: "/services/financial-management", theme: "ink", icon: BarChart01 },
        { copy: t("twoPillars.pillarTwo", { returnObjects: true }) as PillarCopy, to: "/services/business-consulting", theme: "graphite", icon: Compass01 },
    ];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">
            {pillars.map(({ copy, to, theme, icon: Icon }) => {
                const isLeft = theme === "ink";
                return (
                    <Link
                        key={to}
                        to={lp(to)}
                        className={`group relative flex min-h-[26rem] flex-col justify-between overflow-hidden px-8 py-16 transition-all duration-300 lg:px-14 lg:py-24 ${
                            isLeft ? "items-end bg-ink text-ivory hover:bg-[#141414]" : "bg-graphite text-ivory hover:bg-[#1f1f21]"
                        }`}
                    >
                        <div className="pointer-events-none absolute inset-0 z-0 flex items-end overflow-hidden opacity-[0.04]">
                            {isLeft ? (
                                <div className="grid w-full grid-cols-8 items-end gap-3 px-8 pb-8 lg:px-14 lg:pb-10">
                                    {LEDGER_ROWS.map((h, i) => (
                                        <span key={i} className="bg-current" style={{ height: `${h * 24}px` }} />
                                    ))}
                                </div>
                            ) : (
                                <MinimalLineChart
                                    points={[10, 26, 22, 42, 40, 62, 60, 95]}
                                    className="h-48 w-full text-ivory lg:h-56"
                                    strokeClassName="stroke-brass"
                                />
                            )}
                        </div>

                        <Reveal className={`relative z-10 ${isLeft ? "text-right" : ""}`}>
                            <Icon className={`size-7 text-brass transition-transform duration-300 group-hover:scale-110 ${isLeft ? "ml-auto" : ""}`} />
                            <p className="mt-5 font-mono text-xs tracking-widest text-mist uppercase">{copy.eyebrow}</p>
                            <h3 className="mt-4 font-display text-3xl lg:text-4xl">{copy.title}</h3>
                            <p className="mt-2 text-brass">{copy.tagline}</p>
                            <p className={`mt-6 max-w-sm text-sm leading-relaxed text-mist ${isLeft ? "ml-auto" : ""}`}>{copy.body}</p>
                        </Reveal>

                        <span
                            className={`relative z-10 mt-10 inline-flex w-max items-center gap-2 rounded-[2px] border border-ivory/40 px-4 py-2.5 text-xs tracking-wide uppercase transition-colors duration-300 group-hover:border-brass group-hover:text-brass ${isLeft ? "self-end" : "self-start"}`}
                        >
                            {copy.cta} — {copy.title}
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </Link>
                );
            })}
        </section>
    );
}
