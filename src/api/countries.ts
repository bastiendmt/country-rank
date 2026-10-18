import { apiFetch } from '@/api/apiFetch';
import type { Countries, CountryV5 } from '@/types';

// Revalidate once per week (7 days)
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

// Maximum page size allowed by the current plan
const PAGE_SIZE = 100;

// Only the properties the app uses, to keep the payload small
const RESPONSE_FIELDS = [
  'names.common',
  'names.native',
  'names.translations.eng',
  'names.translations.fra',
  'codes.alpha_3',
  'flag.emoji',
  'flag.url_svg',
  'flag.url_png',
  'flag.description',
  'region',
  'subregion',
  'area.kilometers',
  'population',
  'economy.gini_coefficient',
  'borders',
  'currencies',
  'languages',
  'capitals',
  'coordinates',
  'links.google_maps',
].join(',');

interface CountriesPage {
  data: { objects: CountryV5[]; meta: { more: boolean } };
}

/**
 * Get all countries from https://api.restcountries.com/countries/v5?limit=100&offset=[offset]
 * The API is paginated, so pages are fetched until `meta.more` is false.
 * @returns Country[]
 */
export async function getCountries(): Promise<Countries | undefined> {
  try {
    const countries: CountryV5[] = [];
    for (let offset = 0, more = true; more; offset += PAGE_SIZE) {
      const res = await apiFetch(
        `?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${RESPONSE_FIELDS}`,
        {
          next: { revalidate: REVALIDATE_SECONDS },
        },
      );
      if (!res.ok) {
        throw new Error(
          `Failed to fetch countries: ${res.status} ${res.statusText}`,
        );
      }
      const { data } = (await res.json()) as CountriesPage;
      countries.push(...data.objects);
      more = data.meta.more;
    }
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return undefined;
  }
}

/**
 * Get a country from the cached countries list.
 * The list is fetched in 3 requests and cached, so looking a country up here
 * costs no extra API request (one request per country page was rate limited
 * during static generation).
 * @param {string} alphaCode - 3 character alpha code of the desired country
 * @returns Country, or null if it does not exist
 */
export async function getCountryByCode(
  alphaCode: string,
): Promise<CountryV5 | null> {
  const countries = await getCountries();
  const code = alphaCode.toLowerCase();
  return (
    countries?.find(
      (country) => country.codes.alpha_3.toLowerCase() === code,
    ) ?? null
  );
}

/**
 * Get the neighboring countries from the cached countries list
 * @param {string[]} alphaCodes - 3 character alpha codes of the neighbors
 * @throws if the countries list could not be fetched
 */
export async function getNeighbors(alphaCodes: string[]): Promise<Countries> {
  const countries = await getCountries();
  if (!countries) throw new Error('Failed to fetch countries');
  const codes = new Set(alphaCodes.map((code) => code.toLowerCase()));
  return countries.filter((country) =>
    codes.has(country.codes.alpha_3.toLowerCase()),
  );
}
