import { useEffect, useMemo, useState } from "react";
import { DEFAULT_LANGUAGE, LanguageContext } from "./languageContext.js";

const SUPPORTED_LANGUAGES = ["es", "en", "fr", "de"];

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    if (saved) return saved;
    const browserLang = navigator.language?.slice(0, 2) || DEFAULT_LANGUAGE;
    return SUPPORTED_LANGUAGES.includes(browserLang)
      ? browserLang
      : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export default LanguageProvider;


