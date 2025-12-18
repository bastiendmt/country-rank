'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

const TProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return children;

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default TProvider;
