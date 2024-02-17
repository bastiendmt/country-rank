'use client';

import { Globe2, Moon, Sun } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '@/components/LanguageProvider';
import styles from '@/styles/layout.module.css';
import { useTranslate } from '@/translations/translations';
import { useTheme } from 'next-themes';

export const HeaderButtons = () => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const translate = useTranslate(language);

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <>
        <button
          type="button"
          className={styles.theme_switcher}
          title={translate.switchTheme}
        >
          <Moon />
        </button>
        <button
          type="button"
          className={styles.language_switcher}
          title={translate.switchLanguage}
        >
          <Globe2 />
        </button>
      </>
    );

  const switchTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <>
      <button
        type="button"
        className={styles.theme_switcher}
        onClick={switchTheme}
        title={translate.switchTheme}
      >
        {resolvedTheme === 'light' ? <Moon /> : <Sun />}
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
