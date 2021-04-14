import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout/Layout'
import styles from './Country.module.css'
import formatNumber from '../../functions/formatNumber'

import l10n from '../../../public/locales/translation.json'
import { LangContext } from '../../pages/_app'

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

    const country = await res.json()

    return country
}

const Country = ({ country }) => {
    const [borders, setBorders] = useState([])
    const { lang } = useContext(LangContext)

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)))

        setBorders(borders)
    }

    useEffect(() => {
        getBorders()
    }, [country])

    useEffect(() => {
        getBorders()
    }, [country])

    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name}></img>

                    <h1 className={styles.overview_name}>
                        {country.translations[lang] || country.name}
                    </h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{formatNumber(country.population)}</div>
                            <div className={styles.overview_label}>{l10n['country']['population'][lang]}</div>
                        </div>

                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{formatNumber(country.area)} (km<sup style={{ fontSize: "0.5rem" }}> 2</sup>)</div>
                            <div className={styles.overview_label}>{l10n['country']['area'][lang]}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <h4 className={styles.details_panel_heading}>{l10n['country']['details'][lang]}</h4>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['capital'][lang]}</div>
                        <div className={styles.details_panel_value}>{country.capital}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['subregion'][lang]}</div>
                        <div className={styles.details_panel_value}>{country.subregion}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['languages'][lang]}</div>
                        <div className={styles.details_panel_value}>
                            {country.languages.map(({ name }) => name).join(", ")}
                        </div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['currencies'][lang]}</div>
                        <div className={styles.details_panel_value}>
                            {country.currencies.map(({ name }) => name).join(", ")}
                        </div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['native_name'][lang]}</div>
                        <div className={styles.details_panel_value}>{country.nativeName}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{l10n['country']['gini'][lang]}</div>
                        <div className={styles.details_panel_value}>{country.gini} %</div>
                    </div>

                    <div className={styles.details_panel_borders}>
                        <div className={styles.details_panel_borders_label}>{l10n['country']['neighbouring_countries'][lang]}</div>

                        <div className={styles.details_panel_borders_container}>
                            {borders.map(({ flag, name, alpha3Code, translations }) =>
                                <Link href={`/country/${alpha3Code}`} key={name}>
                                    <div className={styles.details_panel_borders_country}>
                                        <img src={flag} alt={name} />
                                        <div className={styles.details_panel_name}>{translations[lang] || name}</div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Country

export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await res.json()

    const paths = countries.map(country => ({
        params: { id: country.alpha3Code }
    }))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const country = await getCountry(params.id)

    return {
        props: { country }
    }
}