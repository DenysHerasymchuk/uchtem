import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Contact() {
    const { t } = useTranslation("contact");

    return (
        <>
            <Seo title={t("seo.title")} description={t("seo.description")} path="/contact" includeOrgSchema />
            <ContactSection headingLevel="h1" className="bg-ivory pt-40 pb-24 lg:pt-48 lg:pb-32" />
        </>
    );
}
