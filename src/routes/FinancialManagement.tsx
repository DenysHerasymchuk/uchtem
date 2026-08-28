import { useTranslation } from "react-i18next";
import { Briefcase01, ClipboardCheck, Coins01, BarChartSquare02, BarChart02, Wallet02 } from "@untitledui/icons";
import { Seo } from "@/components/layout/Seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBreakdown } from "@/components/sections/ServiceBreakdown";
import { CtaBand } from "@/components/sections/CtaBand";

const ICONS = [ClipboardCheck, BarChartSquare02, Briefcase01, BarChart02, Wallet02, Coins01];

export default function FinancialManagement() {
    const { t } = useTranslation("financialManagement");
    const items = (t("breakdown.items", { returnObjects: true }) as { title: string; body: string }[]).map((item, i) => ({
        ...item,
        icon: ICONS[i],
    }));

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/services/financial-management" />
            <PageHero eyebrow={t("hero.eyebrow")} headline={t("hero.headline")} supporting={t("hero.supporting")} />
            <ServiceBreakdown eyebrow={t("breakdown.eyebrow")} headline={t("breakdown.headline")} items={items} />
            <CtaBand headline={t("cta.headline")} supporting={t("cta.supporting")} />
        </>
    );
}
