import { getCountries } from '@/api/getCountries';
import type { Countries } from '@/types';

/**
 * Get the neighboring countries from the cached countries list
 * @param {string[]} alphaCodes - an array of 3 character alpha code of the desired countries
 * @returns Country[]
 */
export async function getBorders(alphaCodes: string[]): Promise<Countries> {
  const countries = await getCountries();
  if (!countries) throw new Error('Failed to fetch countries');
  const codes = new Set(alphaCodes.map((code) => code.toLowerCase()));
  return countries.filter((country) =>
    codes.has(country.codes.alpha_3.toLowerCase()),
  );
}
