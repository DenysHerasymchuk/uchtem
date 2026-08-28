import { useTranslation } from "react-i18next";
import { CheckCircle, XClose } from "@untitledui/icons";
import { Reveal } from "@/components/ui/Reveal";

interface ComparisonRow {
    conventional: string;
    uchtem: string;
}

export function Comparison() {
    const { t } = useTranslation("services");
    const rows = t("comparison.rows", { returnObjects: true }) as ComparisonRow[];

    return (
        <section className="bg-ivory py-24 lg:py-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-widest text-stone uppercase">{t("comparison.eyebrow")}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-ink">
                        {t("comparison.headline")}
                    </h2>
                </Reveal>

                <div className="mt-14 overflow-hidden border border-ink/12">
                    <div className="grid grid-cols-2 border-b border-ink/12 font-mono text-xs tracking-widest uppercase">
                        <div className="border-r border-ink/12 px-6 py-4 text-stone">{t("comparison.conventionalLabel")}</div>
                        <div className="bg-ink px-6 py-4 text-ivory">Uchtem</div>
                    </div>
                    {rows.map((row) => (
                        <div key={row.conventional} className="group grid grid-cols-2 border-b border-ink/12 transition-colors last:border-b-0">
                            <div className="flex items-start gap-3 border-r border-ink/12 px-6 py-6 transition-colors group-hover:bg-ink/[0.02]">
                                <XClose className="mt-0.5 size-4 shrink-0 text-stone/60" />
                                <p className="text-sm leading-relaxed text-stone">{row.conventional}</p>
                            </div>
                            <div className="flex items-start gap-3 bg-ink/[0.03] px-6 py-6 transition-colors group-hover:bg-ink/[0.06]">
                                <CheckCircle className="mt-0.5 size-4 shrink-0 text-brass" />
                                <p className="text-sm leading-relaxed text-ink">{row.uchtem}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
