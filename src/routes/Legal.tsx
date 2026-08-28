import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";

export default function Legal({ variant }: { variant: "privacy" | "terms" }) {
    const { t } = useTranslation("legal");

    return (
        <>
            <Seo title={t(`${variant}.title`)} description={t(`${variant}.description`)} path={`/${variant}`} />
            <PageHero eyebrow={t("eyebrow")} headline={t(`${variant}.title`)} supporting={t(`${variant}.body`)} />
            <section className="bg-ivory pb-24 lg:pb-32">
                <div className="mx-auto max-w-content px-6 lg:px-10">
                    <Reveal>
                        <p className="max-w-xl text-sm text-stone">
                            {t("contactNote")}{" "}
                            <a href="mailto:hello@uchtem.com" className="text-ink underline decoration-brass underline-offset-4">
                                hello@uchtem.com
                            </a>
                            .
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
