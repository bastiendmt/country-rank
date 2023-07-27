export interface Country {
  altSpellings: string[];
  area: number;
  borders?: string[];
  capital?: string[];
  capitalInfo: {
    latlng: [number, number];
  };
  car: {
    side: string;
    signs: string[];
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  continents: string[];
  currencies?: Record<
    string,
    {
      name: string;
      symbol: string;
    }
  >;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  fifa: string;
  flag: string;
  flags: {
    alt?: string;
    png: string;
    svg: string;
  };
  gini?: Record<string, number>;
  idd: {
    root: string;
    suffixes: string[];
  };
  independent: boolean;
  landlocked: boolean;
  languages?: Record<string, string>;
  latlng: [number, number];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  name: {
    common: string;
    nativeName?: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
    official: string;
  };
  population: number;
  postalCode: {
    format: string;
    regex: string;
  };
  region: string;
  startOfWeek: string;
  status: string;
  subregion?: string;
  timezones: string[];
  tld: string[];
  translations: Record<
    string,
    {
      common: string;
      official: string;
    }
  >;
  unMember: boolean;
}

export type Countries = Country[];

export interface TranslationType {
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
