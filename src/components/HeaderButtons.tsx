'use client';

import { Globe2, Moon, Sun } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@/components/LanguageProvider';
import styles from '@/styles/layout.module.css';
import { useTranslate } from '@/translations/translations';

type Theme = 'light' | 'dark';

export const HeaderButtons = () => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const translate = useTranslate(language);
  const [theme, setTheme] = useState<Theme>('light');

  const switchTheme = () => {
    const newTheme =
      localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.body.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTheme = localStorage.getItem('theme') as Theme | null;
      const targetTheme = localTheme ?? 'light';
      setTheme(targetTheme);
      document.body.dataset.theme = targetTheme;
    }
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.theme_switcher}
        onClick={switchTheme}
        title={translate.switchTheme}
      >
        {theme === 'light' ? <Moon /> : <Sun />}
      </button>
      <button
        type="button"
        className={styles.language_switcher}
        onClick={switchLanguage}
        title={translate.switchLanguage}
      >
        <Globe2 />
      </button>
    </>
  );
};
