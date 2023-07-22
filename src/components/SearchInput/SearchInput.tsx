import { Search } from 'lucide-react';
import styles from './SearchInput.module.css';

const SearchInput = ({
  onChange,
  placeholder,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div className={styles.wrapper}>
    <Search />
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default SearchInput;
