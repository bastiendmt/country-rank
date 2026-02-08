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
    console.error('Country page error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Error loading country</h2>
        <p>
          We couldn&apos;t load this country&apos;s information. Please try
          again.
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
