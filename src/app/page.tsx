'use client';

import { ShuffleRounded } from '@material-ui/icons';
import { useRouter } from 'next/navigation';
import { use, useContext, useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import SearchInput from '../components/SearchInput/SearchInput';
import { API_URL } from '../config';
import { makeQueryClient } from '../queryClient';
import styles from '../styles/Home.module.css';
import translationsContent from '../translations/translations';
import { Countries, TranslationType } from '../types/types';
import Layout from './layout';
import { LangContext } from './_app';

const queryClient = makeQueryClient();

const Index = () => {
  // const countries: Countries = use(getCountries());
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const { language } = useContext(LangContext);
  const translate: TranslationType = translationsContent[language];

  const countries: Countries = use(
    queryClient('getCountries', () =>
      fetch(`${API_URL}/all`).then((res) => {
        console.log(res);
        return res.json();
      }),
    ),
  );

  const filteredCountry = countries.filter(
    (country) =>
      country.name.common?.toLowerCase().includes(keyword) ||
      country.region?.toLowerCase().includes(keyword) ||
      country.subregion?.toLowerCase().includes(keyword),
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
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.counts}>
          <div>
            {countries.length} {translate.foundCountries}
          </div>

          <button
            type="button"
            className={styles.shufflebutton}
            title={translate.randomCountry}
            onClick={randomCountry}
          >
            <ShuffleRounded color="inherit" style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        <div className={styles.input}>
          <SearchInput
            placeholder={translate.filter}
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountry} />
    </Layout>
  );
};

const getCountries = async () => {
  console.log('getCountries');
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();
  return countries;
};

export default Index;
