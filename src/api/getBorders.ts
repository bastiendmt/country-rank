import { API_URL } from '@/api/url';
import { Country } from '@/types';

/**
 * Get countries from https://restcountries.com/v3.1/alpha?codes=[alphaCodes]
 * @param {string[]} alphaCodes - an array of 3 character alpha code of the desired countries
 * @example
 * // https://restcountries.com/v3.1/alpha?codes=fra,bel
 * @returns Country[]
 */
export async function getBorders(alphaCodes: string[]) {
  const res = await fetch(`${API_URL}/alpha?codes=${alphaCodes.join(',')}`);
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json() as Promise<Country[]>;
}
