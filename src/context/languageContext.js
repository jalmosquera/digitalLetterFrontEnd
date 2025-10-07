import { createContext, useContext } from "react";

export const DEFAULT_LANGUAGE = "es";

export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);


