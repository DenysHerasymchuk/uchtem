import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSection() {
    const { t } = useTranslation("home");
    const points = t("problem.points", { returnObjects: true }) as string[];

    return (
        <section className="bg-ivory py-24 lg:py-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-ink text-balance">
                            {t("problem.headline")}
                        </h2>
                    </Reveal>

                    <div className="space-y-6">
                        {points.map((point, index) => (
                            <Reveal key={point} delay={0.1 * index}>
                                <p className="border-l border-ink/15 pl-6 text-lg leading-relaxed text-stone">{point}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
