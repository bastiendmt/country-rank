import type { Metadata } from 'next';
import { getCountries } from '@/api/getCountries';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import NotFound from './not-found';
import { OG_DESCRIPTION, OG_TITLE } from './og';

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
};

const Index = async () => {
  const countries = await getCountries();
  if (!countries) return NotFound();
  return <CountriesTable countries={countries} />;
};

export default Index;
