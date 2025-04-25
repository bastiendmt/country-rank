import { type NextRequest, NextResponse } from 'next/server';
import { getCountries } from './api/getCountries';
import NotFound from './app/[lang]/not-found';
import { i18n } from 'i18n-config';

const { defaultLocale, locales } = i18n;

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const localeCountryRandom = locales.find(
    (loc) => pathname === `/${loc}/country/random`,
  );
  const locale = locales.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  );
  // Handle random country
  if (localeCountryRandom) {
    const countries = await getCountries();
    if (!countries) return NotFound();
    const randomIndex = Math.floor(Math.random() * countries.length);
    const countryCode = countries[randomIndex]?.cca3;
    if (!countryCode) return NextResponse.next();
    return NextResponse.redirect(`${origin}/${locale}/country/${countryCode}`);
  }

  // Allow if path is exactly "/{locale}" or starts with "/{locale}/"
  if (locale) {
    return NextResponse.next();
  }

  // Redirect to default locale if no locale is found keeping the pathname
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url),
  );
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sw.js).*)',
  ],
};
