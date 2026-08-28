import { useTranslation } from "react-i18next";
import { Compass02, Lightbulb01, PieChart01, ShieldTick, Target01, TrendUp01 } from "@untitledui/icons";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBreakdown } from "@/components/sections/ServiceBreakdown";
import { CtaBand } from "@/components/sections/CtaBand";

const ICONS = [PieChart01, TrendUp01, Compass02, Target01, Lightbulb01, ShieldTick];

export default function BusinessConsulting() {
    const { t } = useTranslation("businessConsulting");
    const items = (t("breakdown.items", { returnObjects: true }) as { title: string; body: string }[]).map((item, i) => ({
        ...item,
        icon: ICONS[i],
    }));

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/services/business-consulting" />
            <PageHero eyebrow={t("hero.eyebrow")} headline={t("hero.headline")} supporting={t("hero.supporting")} />
            <ServiceBreakdown eyebrow={t("breakdown.eyebrow")} headline={t("breakdown.headline")} items={items} />
            <CtaBand headline={t("cta.headline")} supporting={t("cta.supporting")} />
        </>
    );
}
