'use client';

import { Globe2, Moon, Sun } from 'lucide-react';
import { useContext, useState } from 'react';
import { LangContext } from '@/app/_app';
import styles from '@/styles/layout.module.css';
import translationsContent from '@/translations/translations';
import { TranslationType } from '@/types/types';

type Theme = 'light' | 'dark';

export const HeaderButtons = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const { language, switchLanguage } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.dataset.theme = newTheme;
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
