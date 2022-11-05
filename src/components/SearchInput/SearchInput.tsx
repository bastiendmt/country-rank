import SearchRounded from '@material-ui/icons/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({
  onChange,
  placeholder,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div className={styles.wrapper}>
    <SearchRounded color="inherit" style={{ fontSize: '1.5rem', width: 24 }} />
    <input
      className={styles.input}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default SearchInput;
