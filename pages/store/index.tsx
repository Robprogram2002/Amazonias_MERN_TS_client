import FilterStore from '@components/Products/FilterStore';
import StoreProducts from '@components/Products/StoreProducts';
import styles from './store.module.scss';

const StorePage = () => (
  <div className={styles.StoreGrid}>
    <FilterStore />
    <StoreProducts />
  </div>
);

export default StorePage;
