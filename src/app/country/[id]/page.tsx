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

// async function getBorders(alphaCodes: string[] | undefined) {
//   return [];
//   if (alphaCodes === undefined) return [];
//   const res = await fetch(`${API_URL}/alpha?codes=${alphaCodes?.join(',')}`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch countries');
//   }
//   return res.json();
// }

const Country = async ({ params: { id } }: { params: { id: string } }) => {
  // console.log(id);
  const country: Country = (await getCountry(id))[0];
  console.log(country?.name.common);
  // const borders: Country[] = await getBorders(country.borders);

  return <CountryDetails country={country} borders={0 || []} />;
};

export default Country;
