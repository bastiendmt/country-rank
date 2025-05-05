import { type Locale } from 'i18n-config';
import { useParams } from 'next/navigation';

/**
 * Hooks to get the current language from the URL parameters.
 * For client components only.
 */
export const useLocale = () => {
  const { lang } = useParams<{ lang: Locale }>();

  const countryTranslationKey = lang === 'fr' ? 'fra' : 'eng';
  return {
    lang,
    /** Key used for api objects */
    countryTranslationKey,
  };
};
