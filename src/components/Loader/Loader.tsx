import { Loader2 } from 'lucide-react';
import styles from './Loader.module.css';

export const Loader = () => (
  <div className={styles.container}>
    <Loader2 className={styles.spinner} />
  </div>
);
