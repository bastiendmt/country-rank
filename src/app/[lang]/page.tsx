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

// eslint-disable-next-line no-undef
const Index = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params;
  const countries = await getCountries();
  if (!countries) return NotFound();
  const dict = await getDictionary(lang as 'en' | 'fr');
  return <CountriesTable countries={countries} dictionary={dict} />;
};

export default Index;
