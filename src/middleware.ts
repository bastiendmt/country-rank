import { type NextRequest, NextResponse } from 'next/server';
import { getCountries } from './api/getCountries';
import NotFound from './app/[lang]/not-found';

// export async function middleware(req: NextRequest) {
//   const { pathname, origin } = req.nextUrl;
//   if (pathname === '/country/random') {
//     const countries = await getCountries();
//     if (!countries) return NotFound();
//     const randomIndex = Math.floor(Math.random() * countries.length);
//     const countryCode = countries[randomIndex]?.cca3;
//     if (!countryCode) return NextResponse.next();
//     // rewriting the url doesn't seen to work
//     return NextResponse.rewrite(`${origin}/country/${countryCode}`);
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/country/:country*'],
// };

const locales = ['en', 'fr'];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = 'fr'; // Default locale
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
