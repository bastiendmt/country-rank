import type { Metadata } from 'next';
import { getCountries } from '@/api/getCountries';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import NotFound from './not-found';
import { OG_DESCRIPTION, OG_TITLE } from './og';
import { getDictionary } from './dictionaries';

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
};

interface PageProps {
  params: Promise<{
    lang: 'en' | 'fr';
  }>;
}

const Index = async ({ params }: PageProps) => {
  const { lang } = await params;
  console.log('index page', lang);
  const countries = await getCountries();
  if (!countries) return NotFound();
  const dict = await getDictionary(lang);
  return <CountriesTable countries={countries} dictionary={dict} />;
};

export default Index;
