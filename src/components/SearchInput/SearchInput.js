import SearchRounded from '@material-ui/icons/SearchRounded'
import styles from './SearchInput.module.css'

const SearchInput = ({...rest}) => {
    return <div className={styles.wrapper}>
        <SearchRounded color="inherit" style={{ fontSize: '1.5rem', width: 24 }}/>
        <input className={styles.input} {...rest}/>
    </div>
}

export default SearchInput