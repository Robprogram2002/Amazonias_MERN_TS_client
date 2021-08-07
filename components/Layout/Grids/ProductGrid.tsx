import { useMutation, useQuery } from 'react-query';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { fetchCategoriesByDepartment } from 'api/products/categories';
import { fetchDepartments } from 'api/products/departments';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { filterProducts, removeProduct } from '@api/products/products';
import { fetchSubsByCategory } from '@api/products/subCategories';
import { IProduct } from '../../../types/Product';
import styles from './ProductGrid.module.scss';

const MySwal = withReactContent(Swal);

const ProductGrid = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);
  const router = useRouter();

  const { isLoading, refetch } = useQuery(
    ['filter-products', value, department, category, subcategory],
    () => filterProducts(value, department, category, subcategory),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setProducts(data);
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  const departments = useQuery('fetch-departments', fetchDepartments, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const categories = useQuery(
    ['fetch-categories', department],
    () => fetchCategoriesByDepartment(department),
    {
      enabled: department !== '',
    }
  );

  const subcategories = useQuery(
    ['fetch-subcategories', category],
    () => fetchSubsByCategory(category),
    {
      enabled: category !== '',
    }
  );

  const mutation = useMutation('delete-product', removeProduct, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        MySwal.fire('Deleted!', 'The product has been deleted.', 'success');
        refetch();
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

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

  useEffect(() => {
    refetch();
  }, [department, category, subcategory]);

  const pushEdit = (slug: string) => {
    router.push(`/admin/products/edit/${slug}`);
  };

  const deleteHandler = (id: string) => {
    mutation.mutate(id);
  };

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

        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                setCategory('');
                setSubcategory('');
              }
              setDepartment(e.target.value);
            }}
            loading={departments.isLoading}
            placeholder="All departments"
            options={
              departments.data?.data.map((element: any) => ({
                id: element._id,
                name: element.name,
              })) || null
            }
          />
        </div>

        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                setSubcategory('');
              }
              setCategory(e.target.value);
            }}
            loading={categories.isLoading}
            placeholder="All categories"
            options={
              categories.data?.data.map((element: any) => ({
                id: element._id,
                name: element.name,
              })) || null
            }
          />
        </div>

        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              setSubcategory(e.target.value);
            }}
            loading={departments.isLoading}
            placeholder="All subcategories"
            options={
              subcategories.data?.data.map((element: any) => ({
                id: element._id,
                name: element.name,
              })) || null
            }
          />
        </div>
      </div>
      <div className={styles.GridContainer}>
        {products &&
          products.map((product) => (
            <div className={styles.ProductCard}>
              <img
                src={
                  product.type === 'simple'
                    ? product.images[0].url
                    : product.productVariants![0].images[0].url
                }
                alt="product first representation"
              />
              <div className={styles.CardBottom}>
                <p> {product.title.substring(0, 40)} </p>
                <span>
                  {`${
                    product.basePrice || product.productVariants![0].basePrice
                  } ${
                    product.currency || product.productVariants![0].currency
                  }`}
                </span>

                <div className={styles.ButtonsRow}>
                  <button
                    type="button"
                    className={styles.Edit}
                    onClick={() => pushEdit(product.slug)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.Delete}
                    onClick={() => {
                      MySwal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteHandler(product._id);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductGrid;
