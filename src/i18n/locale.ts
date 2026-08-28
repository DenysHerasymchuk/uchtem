import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { SupportedLanguage } from "./index";

const EN_PREFIX = "/en";

export function languageFromPathname(pathname: string): SupportedLanguage {
    return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "ua";
}

/** Strips the /en prefix, if present, returning the bare (Ukrainian-locale) path. */
function stripEnPrefix(pathname: string): string {
    if (pathname === EN_PREFIX) return "/";
    if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length);
    return pathname;
}

/** Keeps i18next's active language and <html lang> in sync with the URL on every navigation. */
export function useLocaleSync() {
    const { i18n } = useTranslation();
    const { pathname } = useLocation();

    useEffect(() => {
        const lang = languageFromPathname(pathname);
        if (i18n.language !== lang) void i18n.changeLanguage(lang);
        document.documentElement.lang = lang === "ua" ? "uk" : "en";
    }, [pathname, i18n]);
}

/**
 * Returns a function that prefixes a bare (Ukrainian-locale) path with /en
 * when the site is currently showing English — use for every internal link.
 */
export function useLocalizedPath() {
    const { pathname } = useLocation();
    const lang = languageFromPathname(pathname);

    return (path: string) => {
        if (lang === "ua") return path;
        return path === "/" ? EN_PREFIX : `${EN_PREFIX}${path}`;
    };
}

/** Returns the equivalent URL for the *other* language, for the language switcher. */
export function useOtherLocalePath() {
    const { pathname } = useLocation();
    const lang = languageFromPathname(pathname);

    if (lang === "en") {
        return { otherPath: stripEnPrefix(pathname), otherLang: "ua" as const };
    }
    return { otherPath: pathname === "/" ? EN_PREFIX : `${EN_PREFIX}${pathname}`, otherLang: "en" as const };
}
