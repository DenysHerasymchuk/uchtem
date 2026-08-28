import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, Mail01 } from "@untitledui/icons";
import { useLocalizedPath } from "@/i18n/locale";

export function Footer() {
    const { t } = useTranslation();
    const lp = useLocalizedPath();

    const columns: { heading: string; links: { label: string; to: string }[] }[] = [
        {
            heading: t("footer.columns.services"),
            links: [
                { label: t("footer.links.overview"), to: lp("/services") },
                { label: t("footer.links.financialManagement"), to: lp("/services/financial-management") },
                { label: t("footer.links.businessConsulting"), to: lp("/services/business-consulting") },
            ],
        },
        {
            heading: t("footer.columns.company"),
            links: [
                { label: t("footer.links.about"), to: lp("/about") },
                { label: t("footer.links.contact"), to: lp("/contact") },
            ],
        },
        {
            heading: t("footer.columns.legal"),
            links: [
                { label: t("footer.links.privacy"), to: lp("/privacy") },
                { label: t("footer.links.terms"), to: lp("/terms") },
            ],
        },
    ];

    return (
        <footer className="border-t border-ivory/15 bg-ink text-ivory">
            <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    <div>
                        <Link to={lp("/")}>
                            <img src="/pictures/uchtem-logo-white.png" alt="Uchtem" className="h-6 w-auto" />
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{t("footer.tagline")}</p>
                    </div>

                    {columns.map((column) => (
                        <div key={column.heading}>
                            <h3 className="text-xs tracking-wide text-mist uppercase">{column.heading}</h3>
                            <ul className="mt-4 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="group inline-flex items-center gap-1.5 text-sm text-ivory/85 transition-colors hover:text-brass"
                                        >
                                            {link.label}
                                            <ArrowRight className="size-3 -translate-x-1 text-brass opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; {new Date().getFullYear()} {t("footer.copyright")}
                    </p>
                    <div className="flex gap-6">
                        <a href="mailto:hello@uchtem.com" className="group flex items-center gap-1.5 transition-colors hover:text-brass">
                            <Mail01 className="size-3.5" />
                            hello@uchtem.com
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-1.5 transition-colors hover:text-brass"
                        >
                            LinkedIn
                            <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
