import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from './config';
import { Countries } from './types/types';

const randomCountry = (countries: Countries) => {
  const random = Math.floor(Math.random() * countries.length);
  return `/country/${countries[random].cca3}`;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/country/random') {
    const res = await fetch(`${API_URL}/all`);
    const countries: Countries = await res.json();

    return NextResponse.redirect(randomCountry(countries));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/country/:country*'],
};
