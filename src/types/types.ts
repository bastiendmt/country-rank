export type Countries = Country[];

export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: number;
  cca3: string;
  cioc: string;
  independent: Boolean;
  status: string;
  unMember: Boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    //Varying
    [key: string]: string;
  };
  translations: {
    [key in keyof typeof translationsLanguages]: {
      official: string;
      common: string;
    };
  };
  latlng: [number, number];
  landlocked: Boolean;
  borders: string[];
  area: number;
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
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini?: {
    [key: string]: number;
  };
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
  postalCode: {
    format: string;
    regex: string;
  };
};

enum translationsLanguages {
  ara,
  ces,
  cym,
  deu,
  est,
  fin,
  fra,
  hrv,
  hun,
  ita,
  jpn,
  kor,
  nld,
  per,
  pol,
  por,
  rus,
  slk,
  spa,
  swe,
  urd,
  zho,
}

export type TranslationType = {
  randomCountry: string;
  switchTheme: string;
  filter: string;
  foundCountries: string;
  sort: {
    name: string;
    population: string;
    area: string;
    gini: string;
  };
  country: {
    details: string;
    capital: string;
    subregion: string;
    languages: string;
    currencies: string;
    nativeName: string;
    gini: string;
    neighbouringCountries: string;
    noNeighbors: string;
    population: string;
    area: string;
  };
};
