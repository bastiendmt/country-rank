'use client';

import '@/styles/globals.css';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Language } from '@/types';

interface ContextInterface {
  language: Language;
  switchLanguage: () => void;
}

export const LanguageContext = createContext<ContextInterface>({
  language: 'eng',
  switchLanguage: () => null,
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('eng');

  const switchLanguage = useCallback(() => {
    const newLang = language === 'eng' ? 'fra' : 'eng';
    document.documentElement.lang = newLang; // not used
    setLanguage(newLang);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      switchLanguage,
    }),
    [language, switchLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
