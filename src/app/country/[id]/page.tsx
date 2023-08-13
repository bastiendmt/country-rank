import { Metadata } from 'next';
import { getCountry } from '@/api/getCountry';
import { OG_DESCRIPTION, OG_TITLE } from '@/app/og';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import { API_URL } from '@/config';
import { Countries } from '@/types/types';
import NotFound from './not-found';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const res = await fetch(`${API_URL}/all`);
  const countries = (await res.json()) as Countries;
  return countries.map((country) => ({
    id: country.cca3,
  }));
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const country = await getCountry(id);

  if (!country)
    return {
      description: `Find more about this country by clicking on this link. ${OG_DESCRIPTION}`,
      title: `${OG_TITLE} - Country page`,
    };

  return {
    description: `Find more about ${country.name.common} by clicking on this link. ${OG_DESCRIPTION}`,
    openGraph: {
      images: [country.flags.png],
    },
    title: `${OG_TITLE} - ${country.name.common}`,
  };
}

const Country = async ({ params: { id } }: PageProps) => {
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
