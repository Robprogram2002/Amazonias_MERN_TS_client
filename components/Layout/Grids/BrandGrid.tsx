import { useQuery } from 'react-query';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { useEffect, useState } from 'react';
import { filterByText } from '@api/products/brands';
import { IBrand } from '../../../types/Brand';
import styles from './BrandGrid.module.scss';

const BrandGrid = () => {
  const [brands, setBrands] = useState<IBrand[] | null>(null);
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);

  const { isLoading, refetch } = useQuery(
    ['filter-brands', value],
    () => filterByText(value),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          console.log(data);
          setBrands(data);
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  //   const mutation = useMutation('delete-brand', removeBrand, {
  //     onSuccess: ({ status }) => {
  //       if (status === 200) {
  //         MySwal.fire('Deleted!', 'The brand has been deleted.', 'success');
  //         refetch();
  //       }
  //     },
  //     onError: (error) => {
  //       onErrorHandler(error);
  //     },
  //   });

  const makeSearch = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          refetch();
        } catch (error) {
          console.log(error);
        }
      }, 250)
    );
  };

  useEffect(() => {
    makeSearch();
  }, [value]);

  //   const pushEdit = (slug: string) => {
  //     router.push(`/admin/brands/edit/${slug}`);
  //   };

  //   const deleteHandler = (id: string) => {
  //     mutation.mutate(id);
  //   };

  return (
    <>
      <div className={styles.FilterContainer}>
        <div className={styles.SearchContainer} style={{ width: '400px' }}>
          <input
            type="text"
            placeholder="Filter by name ..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          {isLoading && <Loading3QuartersOutlined />}
        </div>
      </div>
      <div className={styles.GridContainer}>
        {brands &&
          brands.map((brand) => (
            <div className={styles.BrandCard} key={brand._id}>
              <img src={brand.logo.url} alt="ansjdknsa" />
              <div className={styles.CardText}>
                <strong> {brand.name} </strong>
                <span> 398 items </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BrandGrid;
