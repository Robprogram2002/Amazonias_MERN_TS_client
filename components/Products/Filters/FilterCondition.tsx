import { filterContext, filterSettersContext } from '@context/FilterContext';
import { useContext } from 'react';
import { Checkbox } from 'antd';
import styles from '../FilterStore.module.scss';

const FilterCondition = () => {
  const { condition } = useContext(filterContext);
  const { setCondition } = useContext(filterSettersContext);

  return (
    <Checkbox.Group
      className={styles.OptionsList}
      defaultValue={condition || []}
      options={[
        { label: 'New', value: 'new' },
        { label: 'Used', value: 'used' },
        { label: 'Repared', value: 'repared' },
      ]}
      onChange={(e) => setCondition(e.map((value) => value.toString()))}
    />
  );
};

export default FilterCondition;
