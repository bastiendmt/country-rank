import { NextRequest, NextResponse } from 'next/server';
import { getCountries } from './api/getCountries';
import NotFound from './app/not-found';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === '/country/random') {
    const countries = await getCountries();
    if (!countries) return NotFound();
    const randomIndex = Math.floor(Math.random() * countries.length);
    const countryCode = countries[randomIndex]?.cca3;
    if (!countryCode) return NextResponse.next();
    // rewriting the url doesn't seen to work
    return NextResponse.rewrite(`${origin}/country/${countryCode}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/country/:country*'],
};
