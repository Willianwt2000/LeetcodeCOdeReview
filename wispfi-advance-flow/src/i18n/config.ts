import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enCommon from "./locales/en/common.json";
import esCommon from "./locales/es/common.json";

export const defaultNS = "common";
export const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],

    // detection: {
    //   // Check URL query param first (?lang=es), then localStorage
    //   order: ['querystring', 'localStorage', 'navigator'],
    //   lookupQuerystring: 'lang',
    //   lookupLocalStorage: 'wispfi-language',
    //   caches: ['localStorage'],
    // },
    detection: {
      order: ["querystring"],
      lookupQuerystring: "lang",
      caches: [],
    },

    interpolation: {
      escapeValue: false, // React already escapes
    },

    // Development helpers
    debug: import.meta.env.DEV,

    // Log missing keys in development
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation: ${ns}:${key} for languages: ${lngs.join(", ")}`);
      }
    },
  });

export default i18n;
