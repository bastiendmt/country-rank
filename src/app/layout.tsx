'use client';

import { Logo } from '@/logo';
import styles from '@/styles/layout.module.css';
import translationsContent from '@/translations/translations';
import { TranslationType } from '@/types/types';
import { Brightness6Rounded, LanguageRounded } from '@mui/icons-material';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LangContext } from './_app';

type Theme = 'light' | 'dark';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
    <html lang="fr">
      <Head>
        <title>Country rank</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="application-name" content="Country rank" />
        <meta name="apple-mobile-web-app-title" content="Country rank" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#252329" />
        <meta name="description" content="Country ranking" />
        <meta name="keywords" content="rank, country, infos, stats" />
        <meta name="author" content="Bastien Dumont" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <body>
        <div className={styles.container}>
          <header className={styles.header}>
            <Link href="/" passHref>
              <Logo />
            </Link>
            <button
              type="button"
              className={styles.theme_switcher}
              onClick={switchTheme}
              title={translate.switchTheme}
            >
              <Brightness6Rounded style={{ fontSize: '1.5rem' }} />
            </button>
            <button
              type="button"
              className={styles.language_switcher}
              onClick={switchLanguage}
              title={translate.switchLanguage}
            >
              <LanguageRounded style={{ fontSize: '1.5rem' }} />
            </button>
          </header>

          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            <a href="https://github.com/Bastiendmt">Bastien Dumont</a> - Dev
            challenge by Thu Ngiem
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
