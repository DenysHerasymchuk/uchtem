import { useTranslation } from "react-i18next";
import { Seo } from "@/components/layout/Seo";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TwoPillars } from "@/components/sections/TwoPillars";
import { Method } from "@/components/sections/Method";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  const { t } = useTranslation("home");

  return (
    <>
      <Seo
        title={t("seo.title")}
        description={t("seo.description")}
        path="/"
        includeOrgSchema
      />
      <Hero />
      <ClientsStrip />
      <ServicesGrid />
      <Method />
      <ProblemSection />
      <TwoPillars />
      <ContactSection />
    </>
  );
}
