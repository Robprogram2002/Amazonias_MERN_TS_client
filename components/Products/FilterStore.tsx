import { Checkbox } from 'antd';
import FilterBrands from './Filters/FilterBrands';
import FilterDepartments from './Filters/FilterDepartments';
import FilterPrice from './Filters/FilterPrice';
import FilterVendors from './Filters/FilterVendors';
import FilterCondition from './Filters/FilterCondition';
import styles from './FilterStore.module.scss';
import FilterRate from './Filters/FilterRate';

const FilterStore = () => (
  <div className={styles.FiltersContainer}>
    <h4>Department</h4>
    <FilterDepartments />
    <div style={{ height: '15px' }} />
    <h4>Price</h4>
    <FilterPrice />
    <div style={{ height: '15px' }} />
    <h4>Avg. Customer Review</h4>
    <FilterRate />
    <div style={{ height: '15px' }} />
    <h4>Featured Brands</h4>
    <FilterBrands />
    <div style={{ height: '15px' }} />
    <h4>Featured Sellers </h4>
    <FilterVendors />
    <div style={{ height: '15px' }} />
    <h4>Condition</h4>
    <FilterCondition />
    <div style={{ height: '15px' }} />
    <h4>Other</h4>
    <Checkbox.Group
      className={styles.OptionsList}
      options={[
        { label: 'Products On Sale', value: 'onSale' },
        { label: 'Show Out of Stock', value: 'out of stock' },
        { label: 'New Arrivals', value: 'New Arrivals' },
        { label: 'Coming Soon', value: 'Coming Soon' },
      ]}
      // onChange={(e) => console.log(e)}
    />
  </div>
);

export default FilterStore;
