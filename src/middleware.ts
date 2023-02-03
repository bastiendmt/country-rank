import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from './config';
import { Countries } from './types/types';

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname === '/country/random') {
    const res = await fetch(`${API_URL}/all`);
    const countries: Countries = await res.json();
    const random = Math.floor(Math.random() * countries.length);
    return NextResponse.rewrite(`${origin}/country/${countries[random].cca3}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/country/:country*'],
};
