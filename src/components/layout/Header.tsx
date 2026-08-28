import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BarChart01, Building07, Compass01, Globe01, LayoutGrid01, Menu01, XClose } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useLocalizedPath, useOtherLocalePath } from "@/i18n/locale";

export function Header() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lp = useLocalizedPath();
    const { otherPath, otherLang } = useOtherLocalePath();

    const navLinks = [
        { label: t("nav.services"), to: lp("/services"), icon: LayoutGrid01 },
        { label: t("nav.financialManagement"), to: lp("/services/financial-management"), icon: BarChart01 },
        { label: t("nav.businessConsulting"), to: lp("/services/business-consulting"), icon: Compass01 },
        { label: t("nav.about"), to: lp("/about"), icon: Building07 },
    ];

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-6 lg:pt-5">
            <div className="mx-auto flex h-16 max-w-content items-center justify-between rounded-full border border-ivory/15 bg-ink/75 px-5 shadow-[0_8px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl lg:h-[4.25rem] lg:px-8">
                <Link to={lp("/")} onClick={() => setIsMenuOpen(false)}>
                    <img src="/pictures/uchtem-logo-white.png" alt="Uchtem" className="h-5 w-auto lg:h-6" />
                </Link>

                <nav className="hidden items-center gap-7 xl:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 text-xs tracking-wide uppercase transition-colors ${isActive ? "text-brass" : "text-ivory/70 hover:text-ivory"}`
                            }
                        >
                            <link.icon className="size-3.5" />
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-6 xl:flex">
                    <Link
                        to={otherPath}
                        aria-label={otherLang === "en" ? "Switch to English" : "Перемкнути на українську"}
                        className="group flex items-center gap-1.5 font-mono text-xs tracking-widest text-ivory/50 uppercase transition-colors hover:text-brass"
                    >
                        <Globe01 className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
                        {otherLang === "en" ? "EN" : "UA"}
                    </Link>
                    <Button href={lp("/contact")} size="sm" color="primary-inverted" iconTrailing={ArrowRight}>
                        {t("cta.startConversation")}
                    </Button>
                </div>

                <div className="flex items-center gap-4 xl:hidden">
                    <Link
                        to={otherPath}
                        aria-label={otherLang === "en" ? "Switch to English" : "Перемкнути на українську"}
                        className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-ivory/50 uppercase"
                    >
                        <Globe01 className="size-3.5" />
                        {otherLang === "en" ? "EN" : "UA"}
                    </Link>
                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="text-ivory transition-transform hover:scale-110 active:scale-95"
                    >
                        {isMenuOpen ? <XClose className="size-6" /> : <Menu01 className="size-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-3 flex flex-col gap-6 rounded-2xl border border-ivory/15 bg-ink/90 px-6 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl xl:hidden"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 font-display text-2xl ${isActive ? "text-brass" : "text-ivory"}`
                                }
                            >
                                <link.icon className="size-5" />
                                {link.label}
                            </NavLink>
                        ))}
                        <Button
                            href={lp("/contact")}
                            size="md"
                            color="primary-inverted"
                            iconTrailing={ArrowRight}
                            className="mt-2 w-full"
                            onPress={() => setIsMenuOpen(false)}
                        >
                            {t("cta.startConversation")}
                        </Button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
