import { getCountries, getCountryByCode, getNeighbors } from '@/api/countries';
import { OG_TITLE } from '@/app/[lang]/og';
import CountryDetails from '@/components/CountryDetails/CountryDetails';
import { i18n } from 'i18n-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';

export async function generateStaticParams(): Promise<
  { id: string; lang: 'en' | 'fr' }[]
> {
  const countries = await getCountries();

  return i18n.locales.flatMap((locale) =>
    countries.map((country) => ({
      id: country.codes.alpha_3,
      lang: locale,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/country/[id]'>): Promise<Metadata> {
  const { id, lang } = await params;
  const [country, dictionary] = await Promise.all([
    getCountryByCode(id),
    getDictionary(lang as 'en' | 'fr'),
  ]);

  if (!country)
    return {
      description: `${dictionary.og.findMoreAbout.replace('{country}', dictionary.og.countryPage)} ${dictionary.og.description}`,
      title: `${OG_TITLE} - ${dictionary.og.countryPage}`,
    };

  const name =
    country.names.translations[lang === 'fr' ? 'fra' : 'eng']?.common ??
    country.names.common;

  return {
    description: `${dictionary.og.findMoreAbout.replace('{country}', name)} ${dictionary.og.description}`,
    openGraph: {
      images: [country.flag.url_png],
    },
    title: `${OG_TITLE} - ${name}`,
  };
}

const Country = async ({ params }: PageProps<'/[lang]/country/[id]'>) => {
  const { id, lang } = await params;
  const country = await getCountryByCode(id);
  if (!country) return notFound();
  const dictionary = await getDictionary(lang as 'en' | 'fr');
  const borders = country.borders?.length
    ? await getNeighbors(country.borders)
    : [];
  return (
    <CountryDetails
      country={country}
      borders={borders}
      dictionary={dictionary}
    />
  );
};

export default Country;
