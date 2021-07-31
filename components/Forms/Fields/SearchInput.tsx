import { BsSearch } from 'react-icons/bs';
import styles from './SearchInput.module.scss';

const SearchInput = ({
  withIcon,
  onChangeHandler,
  placeholder,
  width,
}: {
  withIcon: boolean;
  onChangeHandler: any;
  placeholder: string;
  width: string;
}) => (
  <div
    className={withIcon ? styles.SearchIconContainer : styles.SearchContainer}
    style={{ width }}
  >
    <input type="text" placeholder={placeholder} onChange={onChangeHandler} />
    {withIcon && (
      <div className={styles.SearchIcon}>
        <BsSearch />
      </div>
    )}
  </div>
);

export default SearchInput;
