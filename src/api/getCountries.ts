import { API_URL } from '@/config';
import { Countries } from '@/types';

/**
 * Get countries from https://restcountries.com/v3.1/all
 * @returns Country[]
 */
export async function getCountries(): Promise<Countries | undefined> {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json() as Promise<Countries>;
}
