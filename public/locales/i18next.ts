import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { i18n as nextI18NextConfig } from "../next-i18next.config";

i18n
  .use(HttpBackend) // Подключаем загрузку переводов по HTTP
  .use(LanguageDetector) // Определение языка (cookie, localStorage, navigator)
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Файлы переводов
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie", "localStorage"],
    },
  });

export default i18n;
