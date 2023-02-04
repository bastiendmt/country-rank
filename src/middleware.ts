import { NextRequest, NextResponse } from 'next/server';
import { getCountries } from './api/getCountries';
import NotFound from './app/not-found';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === '/country/random') {
    const countries = await getCountries();
    if (!countries) return NotFound();
    const random = Math.floor(Math.random() * countries.length);
    return NextResponse.rewrite(`${origin}/country/${countries[random].cca3}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/country/:country*'],
};
