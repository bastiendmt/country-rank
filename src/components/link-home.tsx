'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export const LinkHome = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams();
  return <Link href={`/${lang}`}>{children}</Link>;
};
