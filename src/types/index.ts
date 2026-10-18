export interface Translation {
  country: {
    area: string;
    capital: string;
    currencies: string;
    details: string;
    gini: string;
    languages: string;
    nativeName: string;
    neighboringCountries: string;
    noNeighbors: string;
    population: string;
    subregion: string;
  };
  filter: string;
  foundCountries: string;
  giniDefinition: string;
  loading: string;
  randomCountry: string;
  sort: {
    area: string;
    gini: string;
    name: string;
    population: string;
  };
  switchLanguage: string;
  switchTheme: string;
}

export type Language = 'eng' | 'fra';
