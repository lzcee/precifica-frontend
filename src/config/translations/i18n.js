import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "pt",
        debug: true.valueOf,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["queryString", "cookie"],
            cache: ["cookie"],
        },
    });

export default i18n;
