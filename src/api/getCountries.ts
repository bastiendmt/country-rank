import { API_URL } from '@/api/url';
import { Countries } from '@/types';

/**
 * Get countries from https://restcountries.com/v3.1/all?fields=name,flags,cca3
 * @returns Country[]
 */
export async function getCountries(): Promise<Countries | undefined> {
  try {
    const res = await fetch(
      `${API_URL}/all?fields=name,flags,area,gini,population,translations,cca3`,
      {
        next: { revalidate: 86400 }, // Revalidate once per day (24 hours)
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch countries: ${res.status} ${res.statusText}`,
      );
    }
    return res.json() as Promise<Countries>;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return undefined;
  }
}
