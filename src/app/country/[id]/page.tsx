import { getCountry } from '@/api/getCountry';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import { API_URL } from '@/config';
import { Countries } from '@/types/types';
import NotFound from './not-found';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();
  return countries.map((country) => ({
    id: country.cca3,
  }));
}

const Country = async ({ params: { id } }: { params: { id: string } }) => {
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
