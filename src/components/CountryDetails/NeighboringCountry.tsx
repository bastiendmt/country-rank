import { useLocale } from '@/hooks/useLocale';
import type { CountryV5 } from '@/api/countries';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CountryDetails.module.css';

const NeighboringCountry = ({ country }: { country: CountryV5 }) => {
  const { lang, countryTranslationKey } = useLocale();
  const { flag, names, codes } = country;
  return (
    <Link href={`/${lang}/country/${codes.alpha_3}`} key={names.common}>
      <div className={styles.details_panel_borders_country}>
        <div className={styles.details_panel_image_container}>
          <Image
            src={flag.url_svg}
            alt={names.common}
            width={120}
            height={80}
          />
        </div>
        <div className={styles.details_panel_name}>
          {names.translations[countryTranslationKey]?.common ?? names.common}
        </div>
      </div>
    </Link>
  );
};

export default NeighboringCountry;
