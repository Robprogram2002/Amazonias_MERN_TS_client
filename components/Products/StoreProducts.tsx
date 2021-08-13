import { useContext } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import ProductCard from '@components/Products/Card/ProductCard';
import { filterContext, filterSettersContext } from '@context/FilterContext';
import { fetchStoreProducts } from '@api/products/products';
import Center from '@components/Layout/Containers/Center';
import { DepartmentsMenu } from 'types/Department';
import { CategorySubs } from 'types/Category';
import { ISubCategory } from 'types/SubCategory';
import styles from './StoreProduct.module.scss';

const InfoHead = ({
  department,
  category,
  sub,
}: {
  department: DepartmentsMenu | null;
  category: CategorySubs | null;
  sub: ISubCategory | null;
}) => {
  const { setSort } = useContext(filterSettersContext);
  const { sort } = useContext(filterContext);
  let title = department?.name;

  if (sub) {
    title = `${department?.name} > ${category?.name} > ${sub.name}`;
  } else if (category) {
    title = `${department?.name} > ${category.name}`;
  }

  return (
    <div className={styles.Head}>
      <h1> {title} </h1>
      <p>{category?.description || department?.description}</p>
      <div className={styles.Box}>
        <span> 1-12 of over 80,000 results </span>
        <div className={styles.Sort}>
          <span>Sort By :</span>
          <select
            className={styles.Field}
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
          >
            <option value="average-review" key="average-review">
              Avg. Customer Review
            </option>
            <option value="basePrice-desc" key="basePrice-desc">
              Price Hight to Low
            </option>
            <option value="basePrice-asc" key="basePrice-asc">
              Price Low to Hight
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

const StoreProduct = () => {
  const filters = useContext(filterContext);
  const { isLoading, data } = useQuery(['fetch-store-products', filters], () =>
    fetchStoreProducts(filters)
  );

  return (
    <>
      {data && !isLoading && (
        <div>
          <InfoHead
            department={filters.department}
            category={filters.category}
            sub={filters.sub}
          />
          <div className={styles.ProductsContainer}>
            {data.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      )}
      {isLoading && (
        <Center>
          <LoadingOutlined />
        </Center>
      )}
    </>
  );
};

export default StoreProduct;
