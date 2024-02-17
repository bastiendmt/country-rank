import { HeaderButtons } from '@/components/HeaderButtons';
import LanguageProvider from '@/components/LanguageProvider';
import { Logo } from '@/logo';
import styles from '@/styles/layout.module.css';
import Link from 'next/link';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <body>
      <LanguageProvider>
        <div className={styles.container}>
          <header className={styles.header}>
            <div>
              <Link href="/" passHref>
                <Logo />
              </Link>
            </div>
            <HeaderButtons />
          </header>

          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            <a href="https://github.com/Bastiendmt">Bastien Dumont</a> - Dev
            challenge by Thu Ngiem
          </footer>
        </div>
      </LanguageProvider>
    </body>
  </html>
);
export default RootLayout;
