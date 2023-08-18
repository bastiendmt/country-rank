import Link from 'next/link';
import { HeaderButtons } from '@/components/HeaderButtons';
import { Logo } from '@/logo';
import LanguageProvider from '@/components/LanguageProvider';
import styles from './layout.module.css';

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
