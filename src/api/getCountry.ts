import { getCountries } from '@/api/getCountries';

/**
 * Get a country from the cached countries list.
 * The list is fetched in 3 requests and cached for a day, which avoids one
 * request per country page (rate limited during static generation).
 * @param {string} alphaCode - 3 character alpha code of the desired country
 * @returns Country
 */
export async function getCountry(alphaCode: string) {
  const countries = await getCountries();
  return (
    countries?.find(
      (country) =>
        country.codes.alpha_3.toLowerCase() === alphaCode.toLowerCase(),
    ) ?? null
  );
}
