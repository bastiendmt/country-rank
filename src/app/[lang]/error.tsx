'use client';

import { LinkHome } from '@/components/link-home';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error caught by error boundary:', error);
  }, [error]);

  return (
    <main role="alert">
      <h2>Something went wrong!</h2>
      <p>{error.message || 'An unexpected error occurred'}</p>
      <button onClick={reset} type="button" aria-label="Try again">
        Try again
      </button>
      {' or '}
      <LinkHome>go to home page</LinkHome>
    </main>
  );
}
