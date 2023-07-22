'use client';

import { LangContext } from '@/app/_app';
import styles from '@/styles/layout.module.css';
import translationsContent from '@/translations/translations';
import { TranslationType } from '@/types/types';
import { Globe2, Moon, Sun } from 'lucide-react';
import { useContext, useState } from 'react';

type Theme = 'light' | 'dark';

export const HeaderButtons = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const { language, switchLanguage } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];

  const saveTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const switchTheme = () => {
    if (theme === 'light') {
      saveTheme('dark');
    } else {
      saveTheme('light');
    }
  };
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
