import { useQuery } from 'react-query';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { useEffect, useState } from 'react';
import { filterByText } from '@api/products/vendors';
import Avatar from 'antd/lib/avatar/avatar';
import { useRouter } from 'next/router';
import { IVendor } from '../../../types/Vendor';
import styles from './VendorGrid.module.scss';

const VendorGrid = () => {
  const [vendors, setVendors] = useState<IVendor[] | null>(null);
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);
  const router = useRouter();

  const { isLoading, refetch } = useQuery(
    ['filter-vendors', value],
    () => filterByText(value),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setVendors(data);
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
        {vendors &&
          vendors.map((vendor) => (
            <div className={styles.VendorCard} key={vendor._id}>
              <div className={styles.Header}>
                <div className={styles.Background} />
                <Avatar src={vendor.image.url} shape="circle" />
                <h3> {vendor.name} </h3>
              </div>
              <div className={styles.Bottom}>
                <span>
                  {`${vendor.location.country} , ${vendor.location.state}`}
                </span>
                <span> {vendor.contact.email} </span>
                <button
                  type="button"
                  onClick={() => router.push(`/admin/vendors/${vendor.slug}`)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default VendorGrid;
