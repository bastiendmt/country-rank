import { getCountries } from '@/api/getCountries';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import NotFound from './not-found';

const Index = async () => {
  const countries = await getCountries();
  if (!countries) return NotFound();
  return <CountriesTable countries={countries} />;
};

export default Index;
