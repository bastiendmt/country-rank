import { LinkHome } from '@/components/link-home';
import { getDictionary } from '../../dictionaries';
import { Locale } from 'i18n-config';

const NotFound = async ({ lang }: { lang: Locale }) => {
  const dict = await getDictionary(lang);
  return (
    <div>
      {dict.error.generic} <LinkHome>{dict.error.linkHome}</LinkHome>
    </div>
  );
};

export default NotFound;
