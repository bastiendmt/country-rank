import { HeaderButtons } from '@/components/HeaderButtons';
import { Logo } from '@/logo';
import styles from '@/styles/layout.module.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Country Rank',
  description:
    'A Next.js project that displays countries in list and details about a country such as its population, languages, neighbors.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="fr">
    <body>
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
    </body>
  </html>
);
export default RootLayout;
