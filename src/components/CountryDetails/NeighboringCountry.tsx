import { useLocale } from '@/hooks/useLocale';
import type { Country } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CountryDetails.module.css';

const NeighboringCountry = ({ country }: { country: Country }) => {
  const { lang, countryTranslationKey } = useLocale();
  const { flags, name, cca3, translations } = country;
  return (
    <Link href={`/${lang}/country/${cca3}`} key={name.common}>
      <div className={styles.details_panel_borders_country}>
        <div className={styles.details_panel_image_container}>
          <Image src={flags.svg} alt={name.common} fill />
        </div>
        <div className={styles.details_panel_name}>
          {translations[countryTranslationKey]?.common ?? name.common}
        </div>
      </div>
    </Link>
  );
};

export default NeighboringCountry;
