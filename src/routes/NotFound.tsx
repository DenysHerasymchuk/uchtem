import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { Button } from "@/components/base/buttons/button";
import { useLocalizedPath } from "@/i18n/locale";

export default function NotFound() {
    const { t } = useTranslation("notFound");
    const lp = useLocalizedPath();

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/404" />
            <section className="flex min-h-[60vh] flex-col items-center justify-center bg-ivory px-6 py-24 text-center">
                <p className="font-mono text-xs tracking-widest text-stone uppercase">{t("eyebrow")}</p>
                <h1 className="mt-4 font-display text-4xl text-ink">{t("headline")}</h1>
                <p className="mt-4 max-w-sm text-stone">{t("body")}</p>
                <div className="mt-8">
                    <Button href={lp("/")} size="md" color="primary">
                        {t("cta")}
                    </Button>
                </div>
            </section>
        </>
    );
}
