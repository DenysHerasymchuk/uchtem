import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Method } from "@/components/sections/Method";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";

export default function About() {
    const { t, i18n } = useTranslation("about");
    const whyExistsParagraphs = t("whyExists.paragraphs", { returnObjects: true }) as string[];
    const institutionParagraphs = t("institution.paragraphs", { returnObjects: true }) as string[];

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/about" />
            <PageHero
                eyebrow={t("hero.eyebrow")}
                headline={
                    <>
                        {i18n.language === "en" && "An "}
                        <span className="bg-brass px-1 py-1 text-ink">{t("hero.headlineWord")}</span>
                        {t("hero.headlineRest")}
                    </>
                }
                supporting={t("hero.supporting")}
            />

            <section className="bg-ivory py-24 lg:py-32">
                <div className="mx-auto max-w-content px-6 lg:px-10">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
                        <Reveal>
                            <h2 className="font-display text-2xl leading-snug text-ink">{t("whyExists.heading")}</h2>
                            {whyExistsParagraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-stone leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="font-display text-2xl leading-snug text-ink">{t("institution.heading")}</h2>
                            {institutionParagraphs.map((paragraph) => (
                                <p key={paragraph} className="mt-5 text-stone leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </section>

            <Method />
            <CtaBand headline={t("cta.headline")} />
        </>
    );
}
