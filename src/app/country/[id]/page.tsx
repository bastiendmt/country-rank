'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useContext } from 'react';
import Layout from '../../../components/Layout/Layout';
import Mapbox from '../../../components/Map/Map';
import { API_URL } from '../../../config';
import formatNumber from '../../../functions/formatNumber';
import { giniToString } from '../../../functions/getGini';
import { makeQueryClient } from '../../../queryClient';
import translationsContent from '../../../translations/translations';
import { Country as CountryType, TranslationType } from '../../../types/types';
import { LangContext } from '../../_app';
import styles from './Country.module.css';

const queryClient = makeQueryClient();

const Country = ({ params: { id } }: { params: { id: string } }) => {
  const { language } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];

  const country: CountryType = use(
    queryClient('getCountry', () =>
      fetch(`${API_URL}/alpha/${id}`)
        .then((res) => res.json())
        .then((data) => data[0]),
    ),
  );

  const borders: CountryType[] = country?.borders?.length
    ? use(
        queryClient(`getBorders/${id}`, () =>
          fetch(`${API_URL}/alpha?codes=${country.borders?.join(',')}`).then(
            (res) => res.json(),
          ),
        ),
      )
    : [];

  const getCurrencies = () => {
    if (!country.currencies) return '-';
    return Object.keys(country.currencies)
      .map((curr) => country.currencies[curr].name)
      .join(', ');
  };

  const getLanguages = () => {
    if (!country.languages) return '-';
    return Object.keys(country.languages)
      .map((lang) => country.languages[lang])
      .join(', ');
  };

  const getNativeName = () => {
    if (!country.name.nativeName) return '-';
    return (
      Object.keys(country.name.nativeName)
        // first common native name
        .map((native) => country.name.nativeName[native].common)
        .join(', ')
    );
  };

  return (
    country && (
      <Layout title={country.name.common}>
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <div className={styles.overview_image_container}>
                <Image src={country.flags.svg} alt={country.name.common} fill />
              </div>

              <h1 className={styles.overview_name}>
                {country.translations[language]?.common || country.name.common}
              </h1>
              <div className={styles.overview_region}>{country.region}</div>

              <div className={styles.overview_numbers}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_value}>
                    {formatNumber(country.population)}
                  </div>
                  <div className={styles.overview_label}>
                    {translate.country.population}
                  </div>
                </div>

                <div className={styles.overview_area}>
                  <div className={styles.overview_value}>
                    {formatNumber(country.area)} (km
                    <sup style={{ fontSize: '0.5rem' }}>2</sup>)
                  </div>
                  <div className={styles.overview_label}>
                    {translate.country.area}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container_botton}>
            <div className={styles.details_map}>
              <h2 className={styles.details_panel_heading}>Map</h2>
              <Mapbox coordinates={country.latlng} />
            </div>
          </div>

          <div className={styles.container_right}>
            <div className={styles.details_panel}>
              <h2 className={styles.details_panel_heading}>
                {translate.country.details}
              </h2>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {translate.country.capital}
                </div>
                <div className={styles.details_panel_value}>
                  {country.capital ? country.capital[0] : '-'}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {translate.country.subregion}
                </div>
                <div className={styles.details_panel_value}>
                  {country.subregion}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {translate.country.languages}
                </div>
                <div className={styles.details_panel_value}>
                  {getLanguages()}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {translate.country.currencies}
                </div>
                <div className={styles.details_panel_value}>
                  {getCurrencies()}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {translate.country.nativeName}
                </div>
                <div className={styles.details_panel_value}>
                  {getNativeName()}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div
                  className={styles.details_panel_label}
                  title={translate.giniDefinition}
                >
                  {translate.country.gini}
                </div>
                <div className={styles.details_panel_value}>
                  {giniToString(country)}
                </div>
              </div>

              {borders?.length !== 0 ? (
                <div className={styles.details_panel_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {translate.country.neighboringCountries}
                  </div>

                  <div className={styles.details_panel_borders_container}>
                    {borders.map(({ flags, name, cca3, translations }) => (
                      <Link
                        href={`/country/${cca3}`}
                        key={name.common}
                        passHref
                      >
                        <div className={styles.details_panel_borders_country}>
                          <div className={styles.details_panel_image_container}>
                            <Image src={flags.svg} alt={name.common} fill />
                          </div>
                          <div className={styles.details_panel_name}>
                            {translations[language]?.common || name.common}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.details_panel_no_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {translate.country.neighboringCountries}
                  </div>
                  <div className={styles.details_panel_value}>
                    {translate.country.noNeighbors}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Country;
