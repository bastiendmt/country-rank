import CountriesTable from '../components/CountriesTable/CountriesTable';
import { API_URL } from '../config';
import { Countries } from '../types/types';

async function getCountries() {
  const res = await fetch(`${API_URL}/all`);

  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json();
}

const Index = async () => {
  const countries: Countries = await getCountries();

  return <CountriesTable countries={countries} />;
};

export default Index;
