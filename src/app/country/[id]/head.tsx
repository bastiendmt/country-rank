import { getCountry } from '@/api/getCountry';
import DefaultHeadTags from '@/components/DefaultHeadTags';

const Head = async ({ params: { id } }: { params: { id: string } }) => {
  const country = await getCountry(id);

  const pageTitle = country?.name.common
    ? `${country.name.common} - Country rank`
    : 'Country rank';

  return (
    <>
      <DefaultHeadTags />
      <title>{pageTitle}</title>
    </>
  );
};

export default Head;
