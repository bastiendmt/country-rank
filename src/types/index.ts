/**
 * REST Countries v5 country, limited to the properties requested through
 * `response_fields` in `getCountries`
 */
export interface CountryV5 {
  names: {
    common: string;
    native?: Record<string, { common: string; official: string }>;
    translations: Record<string, { common: string; official: string }>;
  };
  codes: { alpha_3: string };
  capitals?: { name: string }[];
  flag: {
    emoji: string;
    description?: string;
    url_png: string;
    url_svg: string;
  };
  region: string;
  subregion?: string;
  area: { kilometers: number };
  borders?: string[];
  coordinates: { lat: number; lng: number };
  currencies?: { code: string; name: string; symbol: string }[];
  economy?: { gini_coefficient?: Record<string, number> };
  languages?: { iso639_3: string; name: string }[];
  links: { google_maps: string };
  population: number;
}

export type Countries = CountryV5[];

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
