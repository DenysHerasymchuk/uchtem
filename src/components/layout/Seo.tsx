import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SITE_NAME = "Uchtem";
const SITE_URL = "https://uchtem.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoProps {
    title: string;
    description: string;
    /** Bare (Ukrainian-locale) path, e.g. "/services" — always without the /en prefix. */
    path: string;
    /** Include the ProfessionalService JSON-LD block (Home and Contact only). */
    includeOrgSchema?: boolean;
}

const ORG_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    description:
        "Uchtem is the financial infrastructure behind ambitious businesses — bookkeeping, accounting, financial management, and business consulting delivered by one institutional partner.",
    email: "hello@uchtem.com",
    areaServed: "Worldwide",
};

function urlFor(path: string, lang: "ua" | "en") {
    if (lang === "ua") return `${SITE_URL}${path}`;
    return path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
}

export function Seo({ title, description, path, includeOrgSchema }: SeoProps) {
    const { i18n } = useTranslation();
    const lang = i18n.language === "en" ? "en" : "ua";
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
    const canonical = urlFor(path, lang);

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <link rel="alternate" hrefLang="uk" href={urlFor(path, "ua")} />
            <link rel="alternate" hrefLang="en" href={urlFor(path, "en")} />
            <link rel="alternate" hrefLang="x-default" href={urlFor(path, "ua")} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={DEFAULT_OG_IMAGE} />
            <meta property="og:locale" content={lang === "ua" ? "uk_UA" : "en_US"} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

            {includeOrgSchema && <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>}
        </Helmet>
    );
}
