import { AppProps } from "next/app";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import "../styles/globals.css";

interface ContextInterface {
  language: "eng" | "fra" | string;
  switchLanguage: () => void;
}

export const LangContext = React.createContext<ContextInterface>({
  language: "eng",
  switchLanguage: Function,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [language, setLang] = useState("eng");

  const switchLanguage = useCallback(function () {
    setLang((l) => (l === "eng" ? "fra" : "eng"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    function () {
      return {
        language,
        switchLanguage,
      };
    },
    [language, switchLanguage]
  );

  return (
    <LangContext.Provider value={value}>
      <Component {...pageProps} />
    </LangContext.Provider>
  );
};

export default MyApp;
