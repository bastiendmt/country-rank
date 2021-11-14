import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import formatNumber from "../../functions/formatNumber";

import l10n from "../../../public/locales/translation.json";
import { LangContext } from "../../pages/_app";
import getGini from "../../functions/getGini";

const getCountry = async (id) => {
  const res = await fetch(`${process.env.API_URL}/alpha/${id}`);

  const country = await res.json();

  return country[0];
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const { lang } = useContext(LangContext);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, [country]);

  return (
    country && (
      <Layout title={country.name.common}>
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <Image
                src={country.flags.svg}
                alt={country.name}
                width={700}
                height={500}
              />

              <h1 className={styles.overview_name}>
                {country.translations[lang] || country.name.common}
              </h1>
              <div className={styles.overview_region}>{country.region}</div>

              <div className={styles.overview_numbers}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_value}>
                    {formatNumber(country.population)}
                  </div>
                  <div className={styles.overview_label}>
                    {l10n["country"]["population"][lang]}
                  </div>
                </div>

                <div className={styles.overview_area}>
                  <div className={styles.overview_value}>
                    {formatNumber(country.area)} (km
                    <sup style={{ fontSize: "0.5rem" }}> 2</sup>)
                  </div>
                  <div className={styles.overview_label}>
                    {l10n["country"]["area"][lang]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container_right}>
            <div className={styles.details_panel}>
              <h4 className={styles.details_panel_heading}>
                {l10n["country"]["details"][lang]}
              </h4>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["capital"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {country.capital[0]}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["subregion"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {country.subregion}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["languages"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {Object.keys(country.languages)
                    .map((lang) => country.languages[lang])
                    .join(", ")}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["currencies"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {Object.keys(country.currencies)
                    .map((curr) => country.currencies[curr].name)
                    .join(", ")}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["native_name"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {Object.keys(country.name.nativeName)
                    // first common native name
                    .map((native) => country.name.nativeName[native].common)
                    .join(", ")}
                </div>
              </div>

              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>
                  {l10n["country"]["gini"][lang]}
                </div>
                <div className={styles.details_panel_value}>
                  {getGini(country)}
                </div>
              </div>

              {/* {!borders.length ? (
                <div className={styles.details_panel_no_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {l10n["country"]["neighbouring_countries"][lang]}
                  </div>
                  <div className={styles.details_panel_value}>
                    {l10n["country"]["no_neighbors"][lang]}
                  </div>
                </div>
              ) : (
                <div className={styles.details_panel_borders}>
                  <div className={styles.details_panel_borders_label}>
                    {l10n["country"]["neighbouring_countries"][lang]}
                  </div>

                  <div className={styles.details_panel_borders_container}>
                    {borders.map(
                      ({ flags, name, alpha3Code, translations }) => (
                        <Link href={`/country/${alpha3Code}`} key={name}>
                          <div className={styles.details_panel_borders_country}>
                            <Image
                              src={flags.svg}
                              alt={name}
                              width={200}
                              height={150}
                            />
                            <div className={styles.details_panel_name}>
                              {translations[lang] || name}
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.API_URL}/all`);
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.cca3 },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: { country },
  };
};
