import { LangContext } from '@/app/_app';
import { Country } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './CountryDetails.module.css';

const NeighboringCountry = ({ country }: { country: Country }) => {
  const { language } = useContext(LangContext);
  const { flags, name, cca3, translations } = country;
  return (
    <Link href={`/country/${cca3}`} key={name.common} passHref>
      <div className={styles.details_panel_borders_country}>
        <div className={styles.details_panel_image_container}>
          <Image src={flags.svg} alt={name.common} fill />
        </div>
        <div className={styles.details_panel_name}>
          {translations[language]?.common ?? name.common}
        </div>
      </div>
    </Link>
  );
};

export default NeighboringCountry;
