export type Countries = Country[];

export type Country = {
  name: {
    common: String;
    official: String;
    nativeName: {
      [key: string]: {
        official: String;
        common: String;
      };
    };
  };
  tld: String[];
  cca2: String;
  ccn3: Number;
  cca3: String;
  cioc: String;
  independent: Boolean;
  status: String;
  unMember: Boolean;
  currencies: {
    [key: string]: {
      name: String;
      symbol: String;
    };
  };
  idd: {
    root: String;
    suffixes: String[];
  };
  capital: String[];
  altSpellings: String[];
  region: String;
  subregion: String;
  languages: {
    //Varying
    [key: string]: String;
  };
  translations: {
    [key in keyof typeof translationsLanguages]: {
      official: String;
      common: String;
    };
  };
  latlng: [Number, Number];
  landlocked: Boolean;
  area: Number;
  demonyms: {
    eng: {
      f: String;
      m: String;
    };
    fra: {
      f: String;
      m: String;
    };
  };
  flag: String;
  maps: {
    googleMaps: String;
    openStreetMaps: String;
  };
  population: Number;
  gini?: {
    [key: string]: Number;
  };
  fifa: String;
  car: {
    signs: String[];
    side: String;
  };
  timezones: String[];
  continents: String[];
  flags: {
    png: String;
    svg: String;
  };
  coatOfArms: {
    png: String;
    svg: String;
  };
  startOfWeek: String;
  capitalInfo: {
    latlng: [Number, Number];
  };
  postalCode: {
    format: String;
    regex: String;
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
