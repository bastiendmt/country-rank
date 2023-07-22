import { getCountry } from '@/api/getCountry';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import { API_URL } from '@/config';
import { Countries } from '@/types/types';
import { Metadata } from 'next';
import NotFound from './not-found';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const res = await fetch(`${API_URL}/all`);
  const countries = (await res.json()) as Countries;
  return countries.map((country) => ({
    id: country.cca3,
  }));
}

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const country = await getCountry(id);
  return {
    title: country?.name.common
      ? `Country rank - ${country.name.common}`
      : 'Country rank - Country page',
    openGraph: {
      images: [country.flags.png],
    },
  };
}

const Country = async ({ params: { id } }: PageProps) => {
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
