import { filterSettersContext } from '@context/FilterContext';
import { Rate } from 'antd';
import { useContext } from 'react';
import styles from '../FilterStore.module.scss';

const FilterRate = () => {
  const { setRating } = useContext(filterSettersContext);

  const RateOption = ({
    rate,
    handler,
  }: {
    rate: number;
    handler: () => void;
  }) => (
    <div
      className={styles.Rate}
      onClick={handler}
      onKeyDown={handler}
      role="menuitem"
      tabIndex={0}
    >
      <Rate disabled value={rate} className={styles.Stars} />
      <span className={styles.RateText}> & Up </span>
    </div>
  );

  return (
    <div className={styles.OptionsList}>
      <RateOption rate={4} handler={() => setRating(4)} />
      <RateOption rate={3} handler={() => setRating(3)} />
      <RateOption rate={2} handler={() => setRating(2)} />
      <RateOption rate={1} handler={() => setRating(1)} />
    </div>
  );
};

export default FilterRate;
