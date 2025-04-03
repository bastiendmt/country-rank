import type { Metadata } from 'next';
import { getCountries } from '@/api/getCountries';
import { getCountry } from '@/api/getCountry';
import { OG_DESCRIPTION, OG_TITLE } from '@/app/og';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import NotFound from './not-found';

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const countries = await getCountries();
  if (!countries) return [];
  return countries.map((country) => ({
    id: country.cca3,
  }));
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { id } = await params;
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

const Country = async ({ params }: PageProps) => {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { id } = await params;
  const country = await getCountry(id);
  if (!country) return NotFound();
  return <CountryDetails country={country} />;
};

export default Country;
