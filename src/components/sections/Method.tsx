import { useTranslation } from "react-i18next";
import { CheckCircle, Grid01, TrendUp02 } from "@untitledui/icons";
import { Reveal } from "@/components/ui/Reveal";

const STEP_ICONS = [Grid01, CheckCircle, TrendUp02];

export function Method() {
    const { t } = useTranslation("home");
    const steps = t("method.steps", { returnObjects: true }) as { title: string; body: string }[];

    return (
        <section id="method" className="scroll-mt-28 bg-ivory py-24 lg:py-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-widest text-stone uppercase">{t("method.eyebrow")}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-ink">{t("method.headline")}</h2>
                    <p className="mt-5 max-w-xl text-stone">{t("method.intro")}</p>
                </Reveal>

                <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
                    {steps.map((step, i) => {
                        const Icon = STEP_ICONS[i];
                        return (
                            <Reveal key={step.title} delay={0.1 * i}>
                                <div className="group border-t border-ink/15 pt-6">
                                    <div className="flex items-center justify-between">
                                        <Icon className="size-6 text-brass transition-transform duration-300 group-hover:-translate-y-0.5" />
                                        <span className="font-mono text-sm text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    <h3 className="mt-4 font-display text-2xl text-ink">{step.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-stone">{step.body}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
