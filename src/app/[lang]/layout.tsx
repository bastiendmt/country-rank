import { HeaderButtons } from '@/components/HeaderButtons';
import { LinkHome } from '@/components/link-home';
import { Logo } from '@/logo';
import '@/styles/globals.css';
import styles from '@/styles/layout.module.css';
import TProvider from '../../components/ThemeProvider';
import { getDictionary } from './dictionaries';

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'fr' }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
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
