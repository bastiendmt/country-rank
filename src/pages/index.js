import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import CountriesTables from '../components/CountriesTable/CountryTable'
import styles from '../styles/Home.module.css'
import { ShuffleRounded } from '@material-ui/icons'


export default function Home({ countries }) {
    const [keyword, setKeyword] = useState("")
    const router = useRouter()

    const filteredCountry = countries.filter(country =>
        country.name.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion.toLowerCase().includes(keyword)
    )

    const onInputChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }

    const randomCountry = () => {
        const random = Math.floor(Math.random() * filteredCountry.length) + 1

        return router.push(`/country/${countries[random].alpha3Code}`)
    }

    return <Layout>
        <div className={styles.input_container}>
            <div className={styles.counts}>
                <div>Found {countries.length} countries</div>

                <button className={styles.shufflebutton} title="Random country" onClick={randomCountry}>
                    <ShuffleRounded color='inherit' />
                </button>
            </div>

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
