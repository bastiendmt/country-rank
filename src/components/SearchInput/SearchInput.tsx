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
    <Search />
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue}
    />
  </div>
);

export default SearchInput;
