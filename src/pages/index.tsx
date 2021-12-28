import { ShuffleRounded } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CountriesTables from "../components/CountriesTable/CountryTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import { API_URL } from "../config";
import styles from "../styles/Home.module.css";
import translationsContent from "../translations/content";
import { Countries, TranslationType } from "../types/types";
import { LangContext } from "./_app";

const Index = ({ countries }: { countries: Countries }) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { lang } = useContext(LangContext);
  const translate: TranslationType = translationsContent[lang];

  const filteredCountry = countries.filter(
    (country) =>
      country.name.common?.toLowerCase().includes(keyword) ||
      country.region?.toLowerCase().includes(keyword) ||
      country.subregion?.toLowerCase().includes(keyword)
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const randomCountry = () => {
    const random = Math.floor(Math.random() * filteredCountry.length);

    return router.push(`/country/${countries[random].cca3}`);
  };

  return (
    <Layout title="Country rank">
      <div className={styles.input_container}>
        <div className={styles.counts}>
          <div>
            {countries.length} {translate.foundCountries}
          </div>

          <button
            className={styles.shufflebutton}
            title={translate.randomCountry}
            onClick={randomCountry}
          >
            <ShuffleRounded color="inherit" style={{ fontSize: "1.5rem" }} />
          </button>
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder={translate.filter}
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTables countries={filteredCountry} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};

export default Index;
