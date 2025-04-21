'use client';

import type { getDictionary } from '@/app/[lang]/dictionaries';
import formatNumber from '@/functions/formatNumber';
import { formatGini, giniToString } from '@/functions/getGini';
import type { Countries } from '@/types';
import { ChevronDown, ChevronUp, Shuffle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import styles from './CountriesTable.module.css';

type DirectionType = 'asc' | 'desc' | '';
type SortKeys = 'name' | 'population' | 'area' | 'gini' | '';

const getNewDirection = (direction: DirectionType): DirectionType => {
  if (!direction) return 'desc';
  if (direction === 'desc') return 'asc';
  return '';
};

const filterCountries = (countries: Countries, keyword: string): Countries =>
  countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
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

const CountriesTable = ({
  countries,
  dictionary,
}: {
  countries: Countries;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams();
  const countryTranslationKey = lang === 'fr' ? 'fra' : 'eng';
  const searchParams = useSearchParams();
  const [direction, setDirection] = useState<DirectionType>('');
  const [sortKey, setSortKey] = useState<SortKeys>('');
  const search = searchParams.get('search')?.toString() ?? '';
  const filteredCountry = filterCountries(countries, search);
  const orderedCountry = orderBy(filteredCountry, sortKey, direction);

  const setValueAndDirection = (key: SortKeys) => {
    // Only change direction if the key is different
    if (key === sortKey) setDirection(getNewDirection(direction));
    setSortKey(key);
  };

  const onInputChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Getting random index instead of redirecting to /country/random to avoid refetching all countries
   * See middleware.ts for more details
   */
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
            {countries.length} {dictionary.foundCountries}
          </div>
          <button
            type="button"
            className={styles.shuffleButton}
            title={dictionary.randomCountry}
            onClick={randomCountry}
            disabled={countries.length === 0}
          >
            <Shuffle />
          </button>
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder={dictionary.filter}
            onChange={onInputChange}
            defaultValue={searchParams.get('search')?.toString()}
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
            <div>{dictionary.sort.name}</div>
            {sortKey === 'name' && <SortArrow direction={direction} />}
          </button>

          <button
            type="button"
            className={styles.heading_population}
            onClick={() => setValueAndDirection('population')}
          >
            <div>{dictionary.sort.population}</div>
            {sortKey === 'population' && <SortArrow direction={direction} />}
          </button>

          <button
            type="button"
            className={styles.heading_area}
            onClick={() => setValueAndDirection('area')}
          >
            <div>
              {dictionary.sort.area} (km
              <sup style={{ fontSize: '0.5rem' }}>2</sup>)
            </div>
            {sortKey === 'area' && <SortArrow direction={direction} />}
          </button>

          <button
            type="button"
            className={styles.heading_gini}
            onClick={() => setValueAndDirection('gini')}
          >
            <div>{dictionary.sort.gini}</div>
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
                {country.translations[countryTranslationKey]?.common ??
                  country.name.common}
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
