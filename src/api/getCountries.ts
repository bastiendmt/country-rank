import { API_URL } from '@/api/url';
import { Countries } from '@/types';

/**
 * Get countries from https://restcountries.com/v3.1/all?fields=name,flags,cca3
 * @returns Country[]
 */
export async function getCountries(): Promise<Countries | undefined> {
  const res = await fetch(
    `${API_URL}/all?fields=name,flags,area,gini,population,translations,cca3`,
  );
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json() as Promise<Countries>;
}
