import { apiFetch } from '@/api/apiFetch';
import type { Countries, CountryV5 } from '@/types';

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
          next: { revalidate: 86400 }, // Revalidate once per day (24 hours)
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
