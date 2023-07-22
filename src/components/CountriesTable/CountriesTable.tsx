'use client';

import { LangContext } from '@/app/_app';
import formatNumber from '@/functions/formatNumber';
import { formatGini, giniToString } from '@/functions/getGini';
import translationsContent from '@/translations/translations';
import { Countries, TranslationType } from '@/types/types';
import { ChevronDown, ChevronUp, Shuffle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import styles from './CountriesTable.module.css';

type DirectionType = 'asc' | 'desc' | '';
type SortKeys = 'name' | 'population' | 'area' | 'gini' | '';

const filterCountries = (countries: Countries, keyword: string): Countries =>
  countries.filter(
    (country) =>
      country.name.common?.toLowerCase().includes(keyword) ||
      country.region?.toLowerCase().includes(keyword) ||
      country.subregion?.toLowerCase().includes(keyword),
  );

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
        <ChevronDown strokeWidth={2.5} />
      </div>
    );
  }
  return (
    <div className={styles.heading_arrow}>
      <ChevronUp strokeWidth={2.5} />
    </div>
  );
};

const CountriesTable = ({ countries }: { countries: Countries }) => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const [direction, setDirection] = useState<DirectionType>('');
  const [sortKey, setSortKey] = useState<SortKeys>('');
  const { language } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];
  const [currentCountries, setCurrentCountries] = useState(countries);

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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const filteredCountry = filterCountries(countries, keyword);
    const orderedCountry = orderBy(filteredCountry, sortKey, direction);
    setCurrentCountries(orderedCountry);
  }, [keyword, sortKey, direction]);

  const randomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const countryCode = countries[randomIndex]?.cca3;
    if (!countryCode) return;
    router.push(`/country/${countryCode}`);
  };

  return (
    <>
      <div className={styles.input_container}>
        <div className={styles.counts}>
          <div>
            {countries.length} {translate.foundCountries}
          </div>
          <button
            type="button"
            className={styles.shuffleButton}
            title={translate.randomCountry}
            onClick={randomCountry}
            disabled={countries.length === 0}
          >
            <Shuffle />
          </button>
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder={translate.filter}
            onChange={onInputChange}
          />
        </div>
      </div>
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
        {currentCountries.map((country) => (
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
              <div className={styles.area}>
                {formatNumber(country.area) || 0}
              </div>
              <div className={styles.gini}>{giniToString(country.gini)}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CountriesTable;
