import { BsSearch } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from 'react-query';
import { fetchMenuData } from '@api/products/departments';
import { toast } from 'react-toastify';
import styles from './StoreMenu.module.scss';
import DropDown from '../DropDown';
import DropDownTwo from '../DropDown/DropDownTwo';
import SideBarMenu from '../SideBarMenu';

const index = () => {
  const { isError, data } = useQuery('fetch-menuData', fetchMenuData);

  if (isError) {
    toast.error('ohhhhh noooo, something went wrong with menu data');
  }

  return (
    <>
      <div className={styles.MenuContainer}>
        <div className={styles.LogoContainer}>
          <span className={styles.Logo}> Amazonias </span>
        </div>
        <div className={styles.SearchContainer}>
          <input className={styles.SearchInput} />
          <div className={styles.SearchIcon}>
            <BsSearch />
          </div>
        </div>
        <div className={styles.RightsContainer}>
          <div className={styles.TextContent}>
            <span>Hello sign In</span>
            <strong>
              {' '}
              Account & List <IoMdArrowDropdown />{' '}
            </strong>
          </div>
          <div className={styles.TextContent}>
            <span>Returns </span>
            <strong>
              & Orders <IoMdArrowDropdown />{' '}
            </strong>
          </div>
          <div className={styles.CartContainer}>
            <FiShoppingCart size={36} />
            <span>Cart</span>
            <div className={styles.CartCount}>
              <span> 3 </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.SubMenuConatiner}>
        <div style={{ display: 'flex' }}>
          <SideBarMenu data={data || null} />
          <DropDown data={data || null} />
          <DropDownTwo data={data || null} />
          <div className={styles.TextContent}>Today Sales</div>
          <div className={styles.TextContent}>Custom Services</div>
          <div className={styles.TextContent}>Gitf Cards</div>
        </div>
        <div className={styles.TextContent}>
          Amazon&apos;s response to COVID-19
        </div>
      </div>
    </>
  );
};

export default index;
