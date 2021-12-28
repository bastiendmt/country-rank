import { useEffect, useState, useContext, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import formatNumber from "../../functions/formatNumber";

import translationsContent from "../../translations/content";
import { LangContext } from "../_app";
import giniToString from "../../functions/getGini";
import { API_URL } from "../../config";
import {
  Countries,
  Country as CountryType,
  TranslationType,
} from "../../types/types";

const getCountry = async (id: String): Promise<CountryType> => {
  const res = await fetch(`${API_URL}/alpha/${id}`);
  const data = await res.json();
  const country = data[0];
  return country;
};

const Country = ({ country }: { country: CountryType }) => {
  const [borders, setBorders] = useState<CountryType[]>([]);
  const { lang } = useContext(LangContext);
  const translate: TranslationType = translationsContent[lang];

  const getBorders = useCallback(async () => {
    if (!country.borders) return;

    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  }, [country.borders]);

  useEffect(() => {
    getBorders();
  }, [country, getBorders]);

  const getCurrencies = () => {
    if (!country.currencies) return "-";

    return Object.keys(country.currencies)
      .map((curr) => country.currencies[curr].name)
      .join(", ");
  };

  const getLanguages = () => {
    if (!country.languages) return "-";

    return Object.keys(country.languages)
      .map((lang) => country.languages[lang])
      .join(", ");
  };

  const getNativeName = () => {
    if (!country.name.nativeName) return "-";

    return (
      Object.keys(country.name.nativeName)
        // first common native name
        .map((native) => country.name.nativeName[native].common)
        .join(", ")
    );
  };

  return (
    country && (
      <Layout title={country.name.common}>
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                width={700}
                height={500}
              />

              <h1 className={styles.overview_name}>
                {country.translations.lang || country.name.common}
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
                    <sup style={{ fontSize: "0.5rem" }}> 2</sup>)
                  </div>
                  <div className={styles.overview_label}>
                    {translate.country.area}
                  </div>
                </div>
              </div>
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
                  {country.capital ? country.capital[0] : "-"}
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
                <div className={styles.details_panel_label} title={translate.giniDefinition}>
                  {translate.country.gini}
                </div>
                <div className={styles.details_panel_value}>
                  {giniToString(country)}
                </div>
              </div>

              {!borders.length ? (
                <div className={styles.details_panel_no_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {translate.country.neighbouringCountries}
                  </div>
                  <div className={styles.details_panel_value}>
                    {translate.country.noNeighbors}
                  </div>
                </div>
              ) : (
                <div className={styles.details_panel_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {translate.country.neighbouringCountries}
                  </div>

                  <div className={styles.details_panel_borders_container}>
                    {borders.map(({ flags, name, cca3, translations }) => (
                      <Link
                        href={`/country/${cca3}`}
                        key={name.common}
                        passHref
                      >
                        <div className={styles.details_panel_borders_country}>
                          <Image
                            src={flags.svg}
                            alt={name.common}
                            width={200}
                            height={150}
                          />
                          <div className={styles.details_panel_name}>
                            {translations[lang] || name.common}
                          </div>
                        </div>
                      </Link>
                    ))}
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

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.cca3 },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const country = await getCountry(params.id);

  return {
    props: { country },
  };
};
