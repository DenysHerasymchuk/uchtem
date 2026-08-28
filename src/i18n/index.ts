import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonUa from "./locales/ua/common.json";
import commonEn from "./locales/en/common.json";
import homeUa from "./locales/ua/home.json";
import homeEn from "./locales/en/home.json";
import servicesUa from "./locales/ua/services.json";
import servicesEn from "./locales/en/services.json";
import financialManagementUa from "./locales/ua/financialManagement.json";
import financialManagementEn from "./locales/en/financialManagement.json";
import businessConsultingUa from "./locales/ua/businessConsulting.json";
import businessConsultingEn from "./locales/en/businessConsulting.json";
import aboutUa from "./locales/ua/about.json";
import aboutEn from "./locales/en/about.json";
import contactUa from "./locales/ua/contact.json";
import contactEn from "./locales/en/contact.json";
import legalUa from "./locales/ua/legal.json";
import legalEn from "./locales/en/legal.json";
import notFoundUa from "./locales/ua/notFound.json";
import notFoundEn from "./locales/en/notFound.json";

export const SUPPORTED_LANGUAGES = ["ua", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: SupportedLanguage = "ua";

const NAMESPACES = [
    "common",
    "home",
    "services",
    "financialManagement",
    "businessConsulting",
    "about",
    "contact",
    "legal",
    "notFound",
] as const;

i18n.use(initReactI18next).init({
    resources: {
        ua: {
            common: commonUa,
            home: homeUa,
            services: servicesUa,
            financialManagement: financialManagementUa,
            businessConsulting: businessConsultingUa,
            about: aboutUa,
            contact: contactUa,
            legal: legalUa,
            notFound: notFoundUa,
        },
        en: {
            common: commonEn,
            home: homeEn,
            services: servicesEn,
            financialManagement: financialManagementEn,
            businessConsulting: businessConsultingEn,
            about: aboutEn,
            contact: contactEn,
            legal: legalEn,
            notFound: notFoundEn,
        },
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "common",
    ns: NAMESPACES,
    interpolation: { escapeValue: false },
    returnEmptyString: false,
});

export default i18n;
