import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import CountriesTables from '../components/CountriesTable/CountryTable'
import styles from '../styles/Home.module.css'

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("")

  const filteredCountry = countries.filter(country =>
    country.name.toLowerCase().includes(keyword) ||
    country.region.toLowerCase().includes(keyword) ||
    country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return <Layout>
    <div className={styles.input_container}>
      <div className={styles.counts}>Found {countries.length} countries</div>

      <div className={styles.input}>
        <SearchInput placeholder="Filter by name, Region or SubRegion" onChange={onInputChange} />
      </div>
    </div>

    <CountriesTables countries={filteredCountry} />
  </Layout>
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()

  return {
    props: {
      countries
    }
  }
}


/*
IDEAS
- format detail poolation
- onclick neighbouring countries
- switch language
- dark mode
- random country
- map


*/