'use client';

import { useContext } from 'react';
import { LangContext } from './_app';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { language } = useContext(LangContext);
  return (
    <html>
      <head>
        <title>Country rank</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
