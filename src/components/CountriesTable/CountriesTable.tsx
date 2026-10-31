'use client';

import type { Dictionary } from '@/app/[lang]/dictionaries';
import formatNumber from '@/functions/formatNumber';
import { formatGini, giniToString } from '@/functions/getGini';
import { useLocale } from '@/hooks/useLocale';
import type { Countries } from '@/api/countries';
import { ChevronDown, ChevronUp, Shuffle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ViewTransition } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import styles from './CountriesTable.module.css';

type DirectionType = 'asc' | 'desc';
type SortKeys = 'name' | 'population' | 'area' | 'gini';

const SORT_KEYS = new Set<SortKeys>(['name', 'population', 'area', 'gini']);

const isSortKey = (value: string | null): value is SortKeys =>
  SORT_KEYS.has(value as SortKeys);

const isDirection = (value: string | null): value is DirectionType =>
  value === 'asc' || value === 'desc';

/** Names start A to Z, numbers start with the biggest */
const firstDirection = (key: SortKeys): DirectionType =>
  key === 'name' ? 'asc' : 'desc';

/** Click cycle: first direction, opposite direction, then back to default order */
const nextSort = (
  key: SortKeys,
  current: { key?: SortKeys; direction?: DirectionType },
): { key: SortKeys; direction: DirectionType } | null => {
  if (current.key !== key || !current.direction) {
    return { key, direction: firstDirection(key) };
  }
  if (current.direction === firstDirection(key)) {
    return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
  }
  return null;
};

const filterCountries = (countries: Countries, keyword: string): Countries =>
  countries.filter(
    (country) =>
      country.names.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion?.toLowerCase().includes(keyword),
  );

const byName = (a: Countries[number], b: Countries[number]) =>
  a.names.common.localeCompare(b.names.common);

const sortValue = (
  country: Countries[number],
  key: Exclude<SortKeys, 'name'>,
): number | undefined => {
  switch (key) {
    case 'population':
      return country.population;
    case 'area':
      return country.area.kilometers;
    case 'gini':
      return formatGini(country.economy?.gini_coefficient);
  }
};

/**
 * Sorts a copy of the countries. Ties fall back to the name so the order is stable,
 * and countries without a value (e.g. no Gini) always end up last.
 */
const orderBy = (
  countries: Countries,
  key: SortKeys | undefined,
  direction: DirectionType | undefined,
) => {
  if (!key || !direction) return countries;
  const factor = direction === 'desc' ? -1 : 1;

  if (key === 'name') {
    return [...countries].sort((a, b) => factor * byName(a, b));
  }

  return [...countries].sort((a, b) => {
    const valueA = sortValue(a, key);
    const valueB = sortValue(b, key);
    if (valueA === undefined && valueB === undefined) return byName(a, b);
    if (valueA === undefined) return 1;
    if (valueB === undefined) return -1;
    return factor * (valueA - valueB) || byName(a, b);
  });
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
  dictionary: Dictionary;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { countryTranslationKey } = useLocale();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const directionParam = searchParams.get('dir');
  const sortKey = isSortKey(sortParam) ? sortParam : undefined;
  const direction = isDirection(directionParam) ? directionParam : undefined;
  const search = searchParams.get('search')?.toString() ?? '';
  const filteredCountry = filterCountries(countries, search);
  const orderedCountry = orderBy(filteredCountry, sortKey, direction);

  const setValueAndDirection = (key: SortKeys) => {
    const params = new URLSearchParams(searchParams);
    const next = nextSort(key, { key: sortKey, direction });
    if (next) {
      params.set('sort', next.key);
      params.set('dir', next.direction);
    } else {
      params.delete('sort');
      params.delete('dir');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onInputChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  /**
   * Getting random index instead of redirecting to /country/random to avoid refetching all countries
   * See middleware.ts for more details
   */
  const randomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const countryCode = countries[randomIndex]?.codes.alpha_3;
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
            aria-label={dictionary.randomCountry}
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
            aria-label={`Sort by ${dictionary.sort.name}`}
          >
            <div>{dictionary.sort.name}</div>
            {sortKey === 'name' && <SortArrow direction={direction ?? ''} />}
          </button>

          <button
            type="button"
            className={styles.heading_population}
            onClick={() => setValueAndDirection('population')}
            aria-label={`Sort by ${dictionary.sort.population}`}
          >
            <div>{dictionary.sort.population}</div>
            {sortKey === 'population' && (
              <SortArrow direction={direction ?? ''} />
            )}
          </button>

          <button
            type="button"
            className={styles.heading_area}
            onClick={() => setValueAndDirection('area')}
            aria-label={`Sort by ${dictionary.sort.area}`}
          >
            <div>
              {dictionary.sort.area} (km
              <sup style={{ fontSize: '0.5rem' }}>2</sup>)
            </div>
            {sortKey === 'area' && <SortArrow direction={direction ?? ''} />}
          </button>

          <button
            type="button"
            className={styles.heading_gini}
            onClick={() => setValueAndDirection('gini')}
            aria-label={`Sort by ${dictionary.sort.gini}`}
            title={dictionary.giniDefinition}
          >
            <div>{dictionary.sort.gini}</div>
            {sortKey === 'gini' && <SortArrow direction={direction ?? ''} />}
          </button>
        </div>
        {orderedCountry.map((country) => (
          <Link
            href={`${pathname}/country/${country.codes.alpha_3}`}
            key={country.names.common}
            passHref
            transitionTypes={['nav-forward']}
          >
            <div className={styles.rowWrapper}>
              <ViewTransition
                name={`country-bg-${country.codes.alpha_3}`}
                share="morph"
              >
                <div className={styles.rowBg} />
              </ViewTransition>
              <div className={styles.row}>
                <div className={styles.flag}>
                  <ViewTransition
                    name={`country-flag-${country.codes.alpha_3}`}
                    share="morph"
                  >
                    <Image
                      src={country.flag.url_svg}
                      alt={country.names.common}
                      fill
                    />
                  </ViewTransition>
                </div>
                <div className={styles.mobileFlag}>{country.flag.emoji}</div>
                <div className={styles.nameCell}>
                  <ViewTransition
                    name={`country-name-${country.codes.alpha_3}`}
                    share="text-morph"
                  >
                    <div className={styles.name}>
                      {country.names.translations[countryTranslationKey]
                        ?.common ?? country.names.common}
                    </div>
                  </ViewTransition>
                  <div className={styles.subline}>
                    <span>
                      {formatNumber(country.area.kilometers) || 0} km
                      <sup style={{ fontSize: '0.5rem' }}>2</sup>
                    </span>
                  </div>
                </div>
                <ViewTransition
                  name={`country-population-${country.codes.alpha_3}`}
                  share="text-morph"
                >
                  <div className={styles.population}>
                    {formatNumber(country.population)}
                  </div>
                </ViewTransition>
                <ViewTransition
                  name={`country-area-${country.codes.alpha_3}`}
                  share="text-morph"
                >
                  <div className={styles.area}>
                    {formatNumber(country.area.kilometers) || 0}
                  </div>
                </ViewTransition>
                <div className={styles.gini}>
                  {giniToString(country.economy?.gini_coefficient)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CountriesTable;
