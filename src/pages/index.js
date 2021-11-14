import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTables from "../components/CountriesTable/CountryTable";
import styles from "../styles/Home.module.css";
import { ShuffleRounded } from "@material-ui/icons";

import l10n from "../../public/locales/translation.json";
import { LangContext } from "./_app";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { lang } = useContext(LangContext);

  const filteredCountry = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const randomCountry = () => {
    const random = Math.floor(Math.random() * filteredCountry.length) + 1;

    return router.push(`/country/${countries[random].alpha3Code}`);
  };

  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>
          <div>
            {l10n["found_countries"]["1"][lang]} {countries.length}{" "}
            {l10n["found_countries"]["2"][lang]}
          </div>

          <button
            className={styles.shufflebutton}
            title={l10n["random_country"][lang]}
            onClick={randomCountry}
          >
            <ShuffleRounded color="inherit" style={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder={l10n["filter"][lang]}
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTables countries={filteredCountry} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/all`);
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
