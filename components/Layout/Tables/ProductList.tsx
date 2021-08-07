import { useMutation, useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { fetchCategoriesByDepartment } from 'api/products/categories';
import { fetchDepartments } from 'api/products/departments';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { filterProducts, removeProduct } from '@api/products/products';
import { fetchSubsByCategory } from '@api/products/subCategories';
import Avatar from 'antd/lib/avatar/avatar';
import { IProduct } from '../../../types/Product';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const MySwal = withReactContent(Swal);

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [department, setDepartment] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);
  const [openEdit, setOpenEdit] = useState<string | null>(null);
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
      <Table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Type</th>
            <th>State</th>
            <th> Availability </th>
            <th> Department </th>
            <th> Category </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div>
                    <input type="checkbox" value="" />
                  </div>
                </td>
                <td>
                  <Avatar
                    src={
                      product.type === 'simple'
                        ? product.images[0].url
                        : product.productVariants![0].images[0].url
                    }
                    size={80}
                    shape="square"
                  />
                </td>
                <td>
                  <b> {product.title.substring(0, 40)} </b>
                </td>
                <td>
                  {`${
                    product.basePrice || product.productVariants![0].basePrice
                  } ${
                    product.currency || product.productVariants![0].currency
                  }`}
                </td>
                <td> {product.type} </td>
                <td> {product.state || product.productVariants![0].state} </td>
                <td>
                  {product.availability ||
                    product.productVariants![0].availability}
                </td>
                <td> {product.department![0].name.substring(0, 40)} </td>
                <td> {product.category![0].name.substring(0, 40)} </td>
                <td>
                  <div className={styles.EditButton}>
                    <SimpleIcon
                      icon={
                        <DashOutlined
                          size={30}
                          style={{ fontWeight: 'bold' }}
                        />
                      }
                      outline
                      handler={() => {
                        if (openEdit === product._id) {
                          setOpenEdit(null);
                        } else {
                          setOpenEdit(product._id);
                        }
                      }}
                    />
                    <div
                      className={
                        openEdit === product._id
                          ? styles.FloatCardActive
                          : styles.FloatCard
                      }
                    >
                      <div className={styles.EditRow}>
                        <span> View detail </span>
                      </div>
                      <button
                        type="button"
                        className={styles.EditRow}
                        onClick={() => pushEdit(product.slug)}
                      >
                        <span> Edit category </span>
                      </button>
                      <button
                        type="button"
                        className={styles.EditRow}
                        style={{ color: 'red' }}
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
                        <span>
                          {mutation.isLoading ? 'Loading...' : 'Delete '}
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductList;
