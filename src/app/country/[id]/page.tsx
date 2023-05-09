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

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params: { id } }: PageProps) {
  const country = await getCountry(id);
  return {
    title: country?.name.common
      ? `Country rank - ${country.name.common}`
      : 'Country rank - Country page',
  };
}

const Country = async ({ params: { id } }: PageProps) => {
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
