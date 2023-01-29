import CountryDetails from '../../../components/CountryDetails/CountryDetails';
import { API_URL } from '../../../config';
import { Countries, Country } from '../../../types/types';

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/all`);
  const countries: Countries = await res.json();

  const paths = countries.map((country) => ({
    id: country.cca3,
  }));

  return paths;
}

async function getCountry(alphaCode: string) {
  try {
    const res = await fetch(`${API_URL}/alpha/${alphaCode}`, {
      cache: 'force-cache',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch country: ${alphaCode}`);
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}

const Country = async ({ params: { id } }: { params: { id: string } }) => {
  const country: Country = (await getCountry(id))[0];

  return <CountryDetails country={country} />;
};

export default Country;
