import type { MetadataRoute } from 'next';
import { getCountries } from '@/api/getCountries';
import { i18n } from 'i18n-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://country-rank.bastiendmt.vercel.app';
  const countries = await getCountries();

  // Static routes for each locale
  const localeRoutes: MetadataRoute.Sitemap = i18n.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]);

  // Country routes for each locale
  const countryRoutes: MetadataRoute.Sitemap = countries
    ? i18n.locales.flatMap((locale) =>
        countries.map((country) => ({
          url: `${baseUrl}/${locale}/country/${country.cca3}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        })),
      )
    : [];

  return [...localeRoutes, ...countryRoutes];
}
