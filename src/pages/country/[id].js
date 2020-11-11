import Layout from '../../components/Layout/Layout'
import styles from './Country.module.css'
import { useEffect, useState } from 'react'
import formatNumber from '../../functions/formatNumber'

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)

    const country = await res.json()

    return country
}

const Country = ({ country }) => {
    const [borders, setBorders] = useState([])

    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map(border => getCountry(border)))

        setBorders(borders)
    }

    useEffect(() => {
        getBorders()
    }, [])

    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={country.flag} alt={country.name}></img>

                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{formatNumber(country.population)}</div>
                            <div className={styles.overview_label}>Population</div>
                        </div>

                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{formatNumber(country.area)} (km<sup style={{ fontSize: "0.5rem" }}> 2</sup>)</div>
                            <div className={styles.overview_label}>Area</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <h4 className={styles.details_panel_heading}>Details</h4>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Capital</div>
                        <div className={styles.details_panel_value}>{country.capital}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Subregion</div>
                        <div className={styles.details_panel_value}>{country.subregion}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Languages</div>
                        <div className={styles.details_panel_value}>
                            {country.languages.map(({ name }) => name).join(", ")}
                        </div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Currences</div>
                        <div className={styles.details_panel_value}>
                            {country.currencies.map(({ name }) => name).join(", ")}
                        </div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Native name</div>
                        <div className={styles.details_panel_value}>{country.nativeName}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Gini</div>
                        <div className={styles.details_panel_value}>{country.gini} %</div>
                    </div>

                    <div className={styles.details_panel_borders}>
                        <div className={styles.details_panel_borders_label}>Neibhbouring Countries</div>

                        <div className={styles.details_panel_borders_container}>
                            {borders.map(({ flag, name }) =>
                                <div className={styles.details_panel_borders_country} key={name}>
                                    <img src={flag} alt={name} />
                                    <div className={styles.details_panel_name}>{name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}

export default Country

export const getServerSideProps = async ({ params }) => {
    const country = await getCountry(params.id)

    return {
        props: { country }
    }
}