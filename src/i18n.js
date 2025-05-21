import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const userLang =
  localStorage.getItem("language") || navigator.language.split("-")[0] || "tr";

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: userLang,
    fallbackLng: "tr",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

// Dil değiştiğinde, settingsData içindeki language güncellenir
i18next.on("languageChanged", (lng) => {
  localStorage.setItem("language",lng)
});

export default i18next;
