import { filterContext, filterSettersContext } from '@context/FilterContext';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Checkbox } from 'antd';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { fetchFeaturedVendors } from '@api/products/vendors';
import styles from '../FilterStore.module.scss';

const FilterVendors = () => {
  const { department, category, sub, vendor } = useContext(filterContext);
  const { setVendor } = useContext(filterSettersContext);

  const featuredVendors = useQuery(
    ['fetch-featured-vendors', department, category, sub],
    () => fetchFeaturedVendors(department, category, sub),
    { onError: (error) => onErrorHandler(error) }
  );

  if (featuredVendors.data) {
    return (
      <Checkbox.Group
        className={styles.OptionsList}
        defaultValue={vendor || []}
        options={featuredVendors.data.map((element) => ({
          value: element._id,
          label: element.name,
        }))}
        onChange={(e) => setVendor(e.map((value) => value.toString()))}
      />
    );
  }

  return <div />;
};

export default FilterVendors;
