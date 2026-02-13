'use client';

import type { Dictionary } from '@/app/[lang]/dictionaries';
import { useLocale } from '@/hooks/useLocale';
import styles from '@/styles/layout.module.css';
import { type Locale, i18n } from 'i18n-config';
import { Globe2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const HeaderButtons = ({ dictionary }: { dictionary: Dictionary }) => {
  const pathname = usePathname();
  const { lang } = useLocale();
  const [mounted, setMounted] = useState(false);

  const oppositeLanguage =
    i18n.locales.find((l) => l !== lang) ?? i18n.defaultLocale;

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const { resolvedTheme, setTheme } = useTheme();

  const switchTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.theme_switcher}
        onClick={switchTheme}
        title={dictionary.switchTheme}
      >
        {mounted ? (
          resolvedTheme === 'light' ? (
            <Moon />
          ) : (
            <Sun />
          )
        ) : (
          <Moon />
        )}
      </button>
      <Link href={redirectedPathname(oppositeLanguage)}>
        <button
          type="button"
          className={styles.language_switcher}
          title={dictionary.switchLanguage}
        >
          <Globe2 />
        </button>
      </Link>
    </>
  );
};
