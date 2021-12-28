import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CountriesTable.module.css";
import formatNumber from "../../functions/formatNumber";
import getGini from "../../functions/getGini";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";

import translationsContent from "../../translations/content";
import { LangContext } from "../../pages/_app";
import { Countries, TranslationType } from "../../types/types";

const orderBy = (
  countries: Countries,
  value: string,
  direction: string | null
) => {
  //Sort nested name
  if (value === "name") {
    if (direction === "asc") {
      return [...countries].sort((a, b) =>
        a[value].common > b[value].common ? 1 : -1
      );
    }

    if (direction === "desc") {
      return [...countries].sort((a, b) =>
        a[value].common > b[value].common ? -1 : 1
      );
    }
  }

  // Sort with non nested population & area
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }: { direction: string }) => {
  if (!direction) return <></>;

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTables = ({ countries }: { countries: Countries }) => {
  const [direction, setDirection] = useState<string>("");
  const [value, setValue] = useState("");
  const { lang } = useContext(LangContext);
  const translate: TranslationType = translationsContent[lang];

  const orderedCountry = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection("");
    }
  };

  const setValueAndDirection = (value : string) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>{translate.sort.name}</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>{translate.sort.population}</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            {translate.sort.area} (km
            <sup style={{ fontSize: "0.5rem" }}> 2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>{translate.sort.gini}</div>
          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountry.map((country) => (
        <Link
          href={`/country/${country.cca3}`}
          key={country.name.common}
          passHref
        >
          <div className={styles.row}>
            <div className={styles.flag}>
              <Image
                src={country.flags.svg}
                alt={country.name.common}
                width={60}
                height={40}
              />
            </div>
            <div className={styles.name}>
              {country.translations[lang] || country.name.common}
            </div>

            <div className={styles.population}>
              {formatNumber(country.population)}
            </div>

            <div className={styles.area}>{formatNumber(country.area) || 0}</div>

            <div className={styles.gini}>{getGini(country)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTables;
