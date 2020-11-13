import { useState, useContext } from "react"
import Link from 'next/link'
import styles from './CountriesTable.module.css'
import formatNumber from '../../functions/formatNumber'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@material-ui/icons'

import l10n from '../../../public/locales/translation.json'
import { LangContext } from '../../pages/_app'

const orderBy = (countries, value, direction) => {
    if (direction === 'asc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }

    if (direction === 'desc') {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return countries
}

const SortArrow = ({ direction }) => {
    if (!direction) return <></>

    if (direction === 'desc') {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowDownRounded color='inherit' />
        </div>
    } else {
        return <div className={styles.heading_arrow}>
            <KeyboardArrowUpRounded color='inherit' />
        </div>
    }
}

const CountriesTables = ({ countries }) => {
    const [direction, setDirection] = useState()
    const [value, setValue] = useState()
    const { lang } = useContext(LangContext)

    const orderedCountry = orderBy(countries, value, direction)

    const switchDirection = () => {
        if (!direction) {
            setDirection('desc')
        } else if (direction === 'desc') {
            setDirection('asc')
        } else {
            setDirection(null)
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value)
    }

    return <div>
        <div className={styles.heading}>

            <div className={styles.heading_flag}></div>
            <button className={styles.heading_name} onClick={() => setValueAndDirection('name')}>
                <div>{l10n['sort']['name'][lang]}</div>
                {value === 'name' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_population} onClick={() => setValueAndDirection('population')}>
                <div>{l10n['sort']['population'][lang]}</div>
                {value === 'population' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_area} onClick={() => setValueAndDirection('area')}>
                <div>{l10n['sort']['area'][lang]} (km<sup style={{ fontSize: "0.5rem" }}> 2</sup>)</div>
                {value === 'area' && <SortArrow direction={direction} />}
            </button>

            <button className={styles.heading_gini} onClick={() => setValueAndDirection('gini')}>
                <div>{l10n['sort']['gini'][lang]}</div>
                {value === 'gini' && <SortArrow direction={direction} />}
            </button>
        </div>

        {orderedCountry.map((country) =>
            <Link href={`/country/${country.alpha3Code}`} key={country.name}>
                <div className={styles.row}>
                    <div className={styles.flag}>
                        <img src={country.flag} alt={country.name} />
                    </div>
                    <div className={styles.name}>{country.name}</div>

                    <div className={styles.population}>{formatNumber(country.population)}</div>

                    <div className={styles.area}>{formatNumber(country.area) || 0}</div>

                    <div className={styles.gini}>{country.gini || 0} %</div>
                </div>
            </Link>
        )}
    </div>
}

export default CountriesTables