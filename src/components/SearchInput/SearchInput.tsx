import { Search } from 'lucide-react';
import styles from './SearchInput.module.css';

const SearchInput = ({
  onChange,
  placeholder,
  defaultValue,
}: {
  defaultValue: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: string) => void;
  placeholder: string;
}) => (
  <div className={styles.wrapper}>
    <Search aria-hidden="true" />
    <input
      type="search"
      className={styles.input}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
      aria-label={placeholder}
      autoComplete="off"
    />
  </div>
);

export default SearchInput;
