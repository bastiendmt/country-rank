import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LangContext } from '../../app/_app';
import formatNumber from '../../functions/formatNumber';
import { formatGini, giniToString } from '../../functions/getGini';
import translationsContent from '../../translations/translations';
import { Countries, TranslationType } from '../../types/types';
import styles from './CountriesTable.module.css';

type DirectionType = 'asc' | 'desc' | '';
type SortKeys = 'name' | 'population' | 'area' | 'gini' | '';

const orderBy = (
  countries: Countries,
  value: string,
  direction: DirectionType,
) => {
  // Sort nested name
  let sortDirection = 1;
  if (direction === 'desc') {
    sortDirection = -1;
  }

  switch (value) {
    case 'name':
      return [...countries].sort((a, b) =>
        a.name.common > b.name.common ? sortDirection : -sortDirection,
      );
    case 'population':
      return [...countries].sort((a, b) =>
        a.population > b.population ? sortDirection : -sortDirection,
      );
    case 'gini':
      return [...countries].sort((a, b) =>
        formatGini(a.gini) > formatGini(b.gini)
          ? sortDirection
          : -sortDirection,
      );
    case 'area':
      return [...countries].sort((a, b) =>
        a.area > b.area ? sortDirection : -sortDirection,
      );
    default:
      return countries;
  }
};

const SortArrow = ({ direction }: { direction: string }) => {
  if (!direction) return null;

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  }
  return (
    <div className={styles.heading_arrow}>
      <KeyboardArrowUpRounded color="inherit" />
    </div>
  );
};

const CountriesTable = ({ countries }: { countries: Countries }) => {
  const [direction, setDirection] = useState<DirectionType>('');
  const [sortKey, setSortKey] = useState<SortKeys>('');
  const { language } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];

  const orderedCountry = orderBy(countries, sortKey, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection('');
    }
  };

  const setValueAndDirection = (key: SortKeys) => {
    switchDirection();
    setSortKey(key);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag} />
        <button
          type="button"
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>{translate.sort.name}</div>
          {sortKey === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          type="button"
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>{translate.sort.population}</div>
          {sortKey === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          type="button"
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>
            {translate.sort.area} (km
            <sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>
          {sortKey === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          type="button"
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>{translate.sort.gini}</div>
          {sortKey === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountry.map((country) => (
        <Link
          href={`/country/${country.cca3}`}
          key={country.name.common}
          passHref
        >
          <div className={styles.row}>
            <div className={styles.flag}>
              <Image src={country.flags.svg} alt={country.name.common} fill />
            </div>
            <div className={styles.mobileFlag}>{country.flag}</div>
            <div className={styles.name}>
              {country.translations[language]?.common || country.name.common}
            </div>
            <div className={styles.population}>
              {formatNumber(country.population)}
            </div>
            <div className={styles.area}>{formatNumber(country.area) || 0}</div>
            <div className={styles.gini}>{giniToString(country.gini)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
