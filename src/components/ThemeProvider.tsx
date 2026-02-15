'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

const TProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default TProvider;
