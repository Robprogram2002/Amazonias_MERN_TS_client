import { BsSearch } from 'react-icons/bs';
import styles from './SearchInput.module.scss';

const SearchInput = ({
  withIcon,
  handler,
  placeholder,
  width,
}: {
  withIcon: boolean;
  handler: any;
  placeholder: string;
  width: string;
}) => (
  <div
    className={withIcon ? styles.SearchIconContainer : styles.SearchContainer}
    style={{ width }}
  >
    <input type="text" placeholder={placeholder} onChange={handler} />
    {withIcon && (
      <div className={styles.SearchIcon}>
        <BsSearch />
      </div>
    )}
  </div>
);

export default SearchInput;
