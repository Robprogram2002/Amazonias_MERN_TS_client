import { BsSearch } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useQuery } from 'react-query';
import { fetchMenuData } from '@api/products/departments';
import { useContext } from 'react';
import { authContext } from '@context/AuthContext';
import { useRouter } from 'next/router';
import DropDown from '../DropDown';
import DropDownTwo from '../DropDown/DropDownTwo';
import SideBarMenu from '../SideBarMenu';
import styles from './StoreMenu.module.scss';

const index = () => {
  const { user } = useContext(authContext);
  const { data } = useQuery('fetch-menuData', fetchMenuData);
  const router = useRouter();

  const redirectToCart = () => router.push('/user/cart');

  const items = user
    ? user.cart.products.reduce((count, element) => element.count + count, 0)
    : 0;

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
            <span>
              Hello, {user ? user.username.split(' ')[0] : 'sign In'}{' '}
            </span>
            <strong>
              Account & List <IoMdArrowDropdown />
            </strong>
          </div>
          <div className={styles.TextContent}>
            <span>Returns </span>
            <strong>
              & Orders <IoMdArrowDropdown />{' '}
            </strong>
          </div>
          <div
            className={styles.CartContainer}
            onClick={redirectToCart}
            onKeyDown={redirectToCart}
            role="menuitem"
            tabIndex={0}
          >
            <FiShoppingCart size={36} />
            <span>Cart</span>
            <div className={styles.CartCount}>
              <span> {items} </span>
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
