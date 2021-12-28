import React, { useState, useCallback, useMemo, useEffect } from "react";
import "../styles/globals.css";

interface ContextInterface {
  lang: "en" | "fr" | string;
  switchLanguage: () => void;
}

export const LangContext = React.createContext<ContextInterface>({
  lang: "en",
  switchLanguage: () => {},
});

interface Props {
  Component: React.FC;
  pageProps: any;
}

const MyApp = ({ Component, pageProps }: Props) => {
  const [lang, setLang] = useState("en");

  const switchLanguage = useCallback(function () {
    setLang((l) => (l === "en" ? "fr" : "en"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    function () {
      return {
        lang,
        switchLanguage,
      };
    },
    [lang, switchLanguage]
  );

  return (
    <LangContext.Provider value={value}>
      <Component {...pageProps} />
    </LangContext.Provider>
  );
};

export default MyApp;
