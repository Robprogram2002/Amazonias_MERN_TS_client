import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent } from 'react';
import styles from './FormHead.module.scss';

const options = [
  {
    id: 'simple',
    name: 'Simple product',
  },
  {
    id: 'variants',
    name: 'Product with variants',
  },
  {
    id: 'intangible',
    name: 'Intangible product',
  },
];

const ProductHead = ({
  width,
  title,
  update,
  setSelectOption,
}: {
  width: string;
  title: string;
  update: boolean;
  setSelectOption: any;
}) => (
  <div className={styles.Container}>
    <div style={{ width }} className={styles.Row}>
      <h1 className={styles.Title}>{title}</h1>
      {!update && (
        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              setSelectOption(e.target.value);
            }}
            loading={false}
            placeholder=""
            options={options}
          />
        </div>
      )}
    </div>
  </div>
);

export default ProductHead;
