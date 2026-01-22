import { HeaderButtons } from '@/components/HeaderButtons';
import { LinkHome } from '@/components/link-home';
import { Logo } from '@/logo';
import '@/styles/globals.css';
import styles from '@/styles/layout.module.css';
import type { Metadata } from 'next';
import TProvider from '../../components/ThemeProvider';
import { getDictionary } from './dictionaries';
import { OG_DESCRIPTION, OG_TITLE } from './og';

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: `%s | ${OG_TITLE}`,
  },
  description: OG_DESCRIPTION,
  keywords: [
    'countries',
    'country information',
    'world data',
    'population',
    'geography',
    'flags',
    'country rankings',
  ],
  authors: [{ name: 'Bastien Dumont', url: 'https://github.com/Bastiendmt' }],
  creator: 'Bastien Dumont',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://country-rank.bastiendmt.vercel.app/',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: OG_TITLE,
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// eslint-disable-next-line no-undef
const RootLayout = async ({ children, params }: LayoutProps<'/[lang]'>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'fr');
  return (
    <html lang={lang}>
      <body>
        <TProvider>
          <div className={styles.container}>
            <header className={styles.header}>
              <div>
                <LinkHome>
                  <Logo />
                </LinkHome>
              </div>
              <HeaderButtons dictionary={dictionary} />
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <a href="https://github.com/Bastiendmt">Bastien Dumont</a> - Dev
              challenge by Thu Ngiem
            </footer>
          </div>
        </TProvider>
      </body>
    </html>
  );
};
export default RootLayout;
