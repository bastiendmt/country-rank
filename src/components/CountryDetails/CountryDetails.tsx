'use client';

import type { Dictionary } from '@/app/[lang]/dictionaries';
import Mapbox from '@/components/CountryDetails/MapboxMap/MapboxMap';
import formatNumber from '@/functions/formatNumber';
import { giniToString } from '@/functions/getGini';
import { useLocale } from '@/hooks/useLocale';
import type { Countries, CountryV5 } from '@/api/countries';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { ViewTransition } from 'react';
import styles from './CountryDetails.module.css';
import NeighboringCountry from './NeighboringCountry';

const CountryDetails = ({
  country,
  borders,
  dictionary,
}: {
  country: CountryV5;
  borders: Countries;
  dictionary: Dictionary;
}) => {
  const { countryTranslationKey } = useLocale();

  const hasBorders = borders.length !== 0;

  const getCurrencies = () => {
    if (!country.currencies?.length) return '-';
    return country.currencies.map((curr) => curr.name).join(', ');
  };

  const getLanguages = () => {
    if (!country.languages?.length) return '-';
    return country.languages.map((lang) => lang.name).join(', ');
  };

  const getNativeName = () => {
    if (!country.names.native) return '-';
    return (
      Object.keys(country.names.native)
        // first common native name
        .map((native) => country.names.native?.[native]?.common)
        .join(', ')
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <ViewTransition
          name={`country-bg-${country.codes.alpha_3}`}
          share="morph"
        >
          <div className={styles.overview_panel}>
            <div className={styles.overview_image_container}>
              <ViewTransition
                name={`country-flag-${country.codes.alpha_3}`}
                share="morph"
              >
                <Image
                  src={country.flag.url_svg}
                  alt={country.flag.description ?? country.names.common}
                  title={country.flag.description ?? country.names.common}
                  fill
                  priority
                />
              </ViewTransition>
            </div>

            <ViewTransition
              name={`country-name-${country.codes.alpha_3}`}
              share="text-morph"
            >
              <h1 className={styles.overview_name}>
                {country.names.translations[countryTranslationKey]?.common ??
                  country.names.common}
              </h1>
            </ViewTransition>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <ViewTransition
                  name={`country-population-${country.codes.alpha_3}`}
                  share="text-morph"
                >
                  <div className={styles.overview_value}>
                    {formatNumber(country.population)}
                  </div>
                </ViewTransition>
                <div className={styles.overview_label}>
                  {dictionary.country.population}
                </div>
              </div>

              <div className={styles.overview_area}>
                <ViewTransition
                  name={`country-area-${country.codes.alpha_3}`}
                  share="text-morph"
                >
                  <div className={styles.overview_value}>
                    {formatNumber(country.area.kilometers)} (km
                    <sup style={{ fontSize: '0.5rem' }}>2</sup>)
                  </div>
                </ViewTransition>
                <div className={styles.overview_label}>
                  {dictionary.country.area}
                </div>
              </div>
            </div>
          </div>
        </ViewTransition>
      </div>

      <div className={styles.container_botton}>
        <div className={styles.details_map}>
          <div className={styles.map_heading_container}>
            <h2 className={styles.details_panel_heading}>Map</h2>
            <button
              type="button"
              title="Google maps link"
              onClick={() => window.open(country.links.google_maps)}
            >
              <MapPin />
            </button>
          </div>
          <Mapbox coordinates={country.coordinates} />
        </div>
      </div>

      <div className={styles.container_right}>
        <div className={styles.details_panel}>
          <h2 className={styles.details_panel_heading}>
            {dictionary.country.details}
          </h2>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              {dictionary.country.capital}
            </div>
            <div className={styles.details_panel_value}>
              {country.capitals?.[0]?.name ?? '-'}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              {dictionary.country.subregion}
            </div>
            <div className={styles.details_panel_value}>
              {country.subregion}
            </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              {dictionary.country.languages}
            </div>
            <div className={styles.details_panel_value}>{getLanguages()}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              {dictionary.country.currencies}
            </div>
            <div className={styles.details_panel_value}>{getCurrencies()}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}>
              {dictionary.country.nativeName}
            </div>
            <div className={styles.details_panel_value}>{getNativeName()}</div>
          </div>

          <div className={styles.details_panel_row}>
            <div
              className={styles.details_panel_label}
              title={dictionary.giniDefinition}
            >
              {dictionary.country.gini}
            </div>
            <div className={styles.details_panel_value}>
              {giniToString(country.economy?.gini_coefficient)}
            </div>
          </div>

          {!hasBorders ? (
            <div className={styles.details_panel_no_borders}>
              <div className={styles.details_panel_borders_label}>
                {dictionary.country.neighboringCountries}
              </div>
              <div className={styles.details_panel_value}>
                {dictionary.country.noNeighbors}
              </div>
            </div>
          ) : (
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                {dictionary.country.neighboringCountries}
              </div>
              <div className={styles.details_panel_borders_container}>
                {borders.map((border) => (
                  <NeighboringCountry
                    key={border.codes.alpha_3}
                    country={border}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
