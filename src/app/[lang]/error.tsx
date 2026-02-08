'use client';

import { useEffect } from 'react';
import styles from '@/styles/error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Something went wrong</h2>
        <p>
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={() => reset()}
          aria-label="Try again"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
