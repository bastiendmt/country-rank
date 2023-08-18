import { API_URL } from '@/api-url';
import { Country } from '@/types/types';

/**
 * Get countries from https://restcountries.com/v3.1/alpha/[alphaCode]
 * @param {string} alphaCode - 3 character alpha code of the desired country
 * @example
 * // https://restcountries.com/v3.1/alpha/fra
 * @returns Country
 */
export async function getCountry(alphaCode: string) {
  try {
    const res = await fetch(`${API_URL}/alpha/${alphaCode}`, {
      cache: 'force-cache',
    });
    if (!res.ok) throw new Error(`Failed to fetch country: ${alphaCode}`);
    const countryData = (await res.json()) as [Country];
    return countryData[0];
  } catch (error) {
    return null;
  }
}
