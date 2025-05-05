'use client';

import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';
import React from 'react';

export const LinkHome = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useLocale();
  return <Link href={`/${lang}`}>{children}</Link>;
};
