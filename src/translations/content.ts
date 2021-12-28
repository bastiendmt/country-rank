import { TranslationType } from "../types/types";

const translations: {
  "en": TranslationType;
  "fr": TranslationType;
  [key : string] : TranslationType;
} = {
  "en": {
    randomCountry: "Random country",
    switchTheme: "Change theme",
    switchLanguage : "Switch language",
    filter: "Filter by name, Region or SubRegion",
    foundCountries: "Found",
    sort: {
      name: "Name",
      population: "Population",
      area: "Area",
      gini: "Gini",
    },
    country: {
      details: "Details",
      capital: "Capital",
      subregion: "Subregion",
      languages: "Languages",
      currencies: "Currencies",
      nativeName: "Native name",
      gini: "Gini",
      neighbouringCountries: "Neihbouring Countries",
      noNeighbors: "No neighbors",
      population: "Population",
      area: "Area",
    },
  },
  "fr": {
    randomCountry: "Pays aléatoire",
    switchTheme: "Changer de thème",
    switchLanguage : "Changer de langue",
    filter: "Filtrer par nom ou par continent",
    foundCountries: "Trouvés",
    sort: {
      name: "Nom",
      population: "Population",
      area: "Superficie",
      gini: "Gini",
    },
    country: {
      details: "Détails",
      capital: "Capitale",
      subregion: "Continent",
      languages: "Languages",
      currencies: "Devises",
      nativeName: "Nom natif",
      gini: "Gini",
      neighbouringCountries: "Pays voisins",
      noNeighbors: "Aucun voisin",
      population: "Population",
      area: "Superficie",
    },
  },
};

export default translations;
