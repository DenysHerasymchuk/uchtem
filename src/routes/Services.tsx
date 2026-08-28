import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Comparison } from "@/components/sections/Comparison";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Services() {
    const { t } = useTranslation("services");

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/services" />
            <PageHero eyebrow={t("hero.eyebrow")} headline={t("hero.headline")} supporting={t("hero.supporting")} />
            <ServicesGrid />
            <Comparison />
            <CtaBand headline={t("cta.headline")} />
        </>
    );
}
