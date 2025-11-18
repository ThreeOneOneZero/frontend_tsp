import { createContext, useContext, useState, ReactNode } from "react";
import pt_BR from "./pt_BR";
import en_US from "./en_US";

export type Language = "pt_BR" | "en_US";

interface I18nContextType {
  language: Language;
  translations: typeof pt_BR;
  setLanguage: (lang: Language) => void;
}

const i18nContext = createContext<I18nContextType | undefined>(undefined);

const getTranslations = (lang: Language) => {
  return lang === "pt_BR" ? pt_BR : en_US;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "pt_BR";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const translations = getTranslations(language);

  return (
    <i18nContext.Provider
      value={{ language, translations, setLanguage: handleSetLanguage }}
    >
      {children}
    </i18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(i18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
};
