import CountryDetails from '../../../components/CountryDetails/CountryDetails';
import Layout from '../../../components/Layout/Layout';
import { API_URL } from '../../../config';
import { Country } from '../../../types/types';

async function getCountry(alphaCode: string) {
  const res = await fetch(`${API_URL}/alpha/${alphaCode}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch country: ${alphaCode}`);
  }
  return res.json();
}

async function getBorders(alphaCodes: string[] | undefined) {
  if (alphaCodes === undefined) return [];
  const res = await fetch(`${API_URL}/alpha?codes=${alphaCodes?.join(',')}`);

  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json();
}

const Country = async ({ params: { id } }: { params: { id: string } }) => {
  const country: Country = (await getCountry(id))[0];
  const borders: Country[] = await getBorders(country.borders);

  return (
    <Layout title={country.name.common}>
      <CountryDetails country={country} borders={borders} />
    </Layout>
  );
};

export default Country;
