import { filterSettersContext } from '@context/FilterContext';
import { Input } from 'antd';
import { useContext, useState } from 'react';
import styles from '../FilterStore.module.scss';

const FilterPrice = () => {
  const { setPrice } = useContext(filterSettersContext);
  // const { price } = useContext(filterContext);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const setPriceFilter = (min: number, max: number) => {
    setPrice([min, max]);
  };

  const PriceOption = ({
    text,
    min,
    max,
  }: {
    text: string;
    min: number;
    max: number;
  }) => (
    <span
      className={styles.ListItem}
      onClick={() => setPriceFilter(min, max)}
      onKeyDown={() => setPriceFilter(min, max)}
      role="menuitem"
      tabIndex={0}
    >
      {text}
    </span>
  );

  return (
    <div className={styles.OptionsList}>
      <PriceOption text="Under $25" min={0} max={25} />
      <PriceOption text="$25 to $50" min={25} max={50} />
      <PriceOption text="$50 to $100" min={50} max={100} />
      <PriceOption text="$100 to $200" min={100} max={200} />
      <PriceOption text="$200 & Above" min={200} max={2000} />

      <div style={{ display: 'flex' }}>
        <Input
          type="number"
          placeholder="$ Min"
          className={styles.PriceInput}
          onChange={(e) => setMinPrice(+e.target.value)}
        />
        <Input
          type="number"
          placeholder="$ Max"
          className={styles.PriceInput}
          onChange={(e) => setMaxPrice(+e.target.value)}
        />
        <button
          type="button"
          onClick={() => setPriceFilter(+minPrice, +maxPrice)}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default FilterPrice;
