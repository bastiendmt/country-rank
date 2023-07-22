'use client';

import '@/styles/globals.css';
import { AppProps } from 'next/app';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface ContextInterface {
  language: 'eng' | 'fra';
  switchLanguage: () => void;
}

export const LangContext = React.createContext<ContextInterface>({
  language: 'eng',
  switchLanguage: Function,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [language, setLang] = useState<'eng' | 'fra'>('eng');

  const switchLanguage = useCallback(() => {
    setLang((l) => (l === 'eng' ? 'fra' : 'eng'));
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      switchLanguage,
    }),
    [language, switchLanguage],
  );

  return (
    <LangContext.Provider value={value}>
      <Component {...pageProps} />
    </LangContext.Provider>
  );
};

export default MyApp;
