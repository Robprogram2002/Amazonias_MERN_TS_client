import { filterContext, filterSettersContext } from '@context/FilterContext';
import { fetchFeaturedBrands } from '@api/products/brands';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Checkbox } from 'antd';
import onErrorHandler from '@api/authentication/onErrorHandler';
import styles from '../FilterStore.module.scss';

const FilterBrands = () => {
  const { department, category, sub, brand } = useContext(filterContext);
  const { setBrand } = useContext(filterSettersContext);

  const featuredBrands = useQuery(
    ['fetch-featured-brands', department, category, sub],
    () => fetchFeaturedBrands(department, category, sub),
    { onError: (error) => onErrorHandler(error) }
  );

  if (featuredBrands.data) {
    return (
      <Checkbox.Group
        className={styles.OptionsList}
        defaultValue={brand || []}
        options={featuredBrands.data.map((element) => ({
          value: element.name,
          label: element.name,
        }))}
        onChange={(e) => setBrand(e.map((value) => value.toString()))}
      />
    );
  }

  return <div />;
};

export default FilterBrands;
