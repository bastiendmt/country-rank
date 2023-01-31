import CountryDetails from '../../../components/CountryDetails/CountryDetails';
import { API_URL } from '../../../config';
import { Countries, Country } from '../../../types/types';
import NotFound from './not-found';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();

  return countries.map((country) => ({
    id: country.cca3,
  }));
}

export async function getCountry(
  alphaCode: string,
): Promise<Country | undefined> {
  try {
    const res = await fetch(`${API_URL}/alpha/${alphaCode}`, {
      cache: 'force-cache',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch country: ${alphaCode}`);
    }
    const countryData: [Country] = await res.json();
    return countryData[0];
  } catch (error) {
    return undefined;
  }
}

const Country = async ({ params: { id } }: { params: { id: string } }) => {
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
