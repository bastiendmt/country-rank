import type { Metadata } from 'next';
import { getCountries } from '@/api/getCountries';
import { getCountry } from '@/api/getCountry';
import { OG_DESCRIPTION, OG_TITLE } from '@/app/[lang]/og';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import NotFound from './not-found';
import { getDictionary } from '../../dictionaries';
import { i18n } from 'i18n-config';

export async function generateStaticParams(): Promise<
  { id: string; lang: 'en' | 'fr' }[]
> {
  const countries = await getCountries();
  if (!countries) return [];

  return i18n.locales.flatMap((locale) =>
    countries.map((country) => ({
      id: country.cca3,
      lang: locale,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/country/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const country = await getCountry(id);

  // TODO: use locale for metadata
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

const Country = async ({ params }: PageProps<'/[lang]/country/[id]'>) => {
  const { id, lang } = await params;
  const country = await getCountry(id);
  if (!country) return NotFound();
  const dictionary = await getDictionary(lang as 'en' | 'fr');
  return <CountryDetails country={country} dictionary={dictionary} />;
};

export default Country;
