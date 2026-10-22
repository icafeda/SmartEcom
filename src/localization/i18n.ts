import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import vi from "./vi.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGES = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

const LANGUAGE_DETECTOR = {
  type: "languageDetector" as const,
  async: true,

  detect: (callback: (language: string) => void) => {
    AsyncStorage.getItem("LANGUAGE")
      .then((savedLanguage) => {
        callback(savedLanguage ?? "en");
      })
      .catch((error: unknown) => {
        console.error("Error reading saved language", error);
        callback("en");
      });
  },

  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem("LANGUAGE", language).catch((error: unknown) => {
      console.error("Error saving language", error);
    });
  },
};

i18n.use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
  resources: LANGUAGES,
  lng: "en",
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
