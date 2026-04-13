import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCountries } from '@/api/getCountries';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import { i18n } from 'i18n-config';
import NotFound from './not-found';
import { OG_DESCRIPTION, OG_TITLE } from './og';
import { getDictionary } from './dictionaries';

export const metadata: Metadata = {
  title: OG_TITLE,
  description: OG_DESCRIPTION,
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// eslint-disable-next-line no-undef
const Index = async ({ params }: PageProps<'/[lang]'>) => {
  const { lang } = await params;
  const countries = await getCountries();
  if (!countries) return NotFound();
  const dict = await getDictionary(lang as 'en' | 'fr');
  return (
    <Suspense>
      <CountriesTable countries={countries} dictionary={dict} />
    </Suspense>
  );
};

export default Index;
