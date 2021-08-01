import { useMutation, useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { filterByText, removeSubCategory } from 'api/products/subCategories';
import { fetchCategories } from 'api/products/categories';
import { ISubCategory } from 'types/SubCategory';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Table from './Table';

import styles from './DepartmentList.module.scss';

const MySwal = withReactContent(Swal);

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[] | null>(
    null
  );
  const [selectOption, setSelectOption] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);
  const [openEdit, setOpenEdit] = useState<string | null>(null);
  const router = useRouter();

  const { isLoading, refetch } = useQuery(
    ['filter-sub-categories', value, selectOption],
    () => filterByText(value, selectOption),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setSubCategories(data);
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  const categories = useQuery('fetch-categories', fetchCategories, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  const mutation = useMutation('remove-subcategory', removeSubCategory, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        // toast.success('the sub-category was deleted');
        MySwal.fire(
          'Deleted!',
          'The sub-category has been deleted.',
          'success'
        );
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
  }, [selectOption]);

  const pushEdit = (slug: string) => {
    router.push(`/admin/sub-categories/edit/${slug}`);
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
            placeholder="Filter ..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          {isLoading && <Loading3QuartersOutlined />}
        </div>

        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={(e: ChangeEvent<HTMLInputElement>) => {
              setSelectOption(e.target.value);
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
      </div>
      <Table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Order</th>
            <th> Category </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories &&
            subCategories.map((sub: ISubCategory) => (
              <tr>
                <td>
                  <div>
                    <input type="checkbox" value="" />
                  </div>
                </td>
                <td> {sub._id} </td>
                <td>
                  <b> {sub.name} </b>
                </td>
                <td> {sub.slug} </td>
                <td> 30 </td>
                <td> {sub.category[0]!.name} </td>
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
                        if (openEdit === sub._id) {
                          setOpenEdit(null);
                        } else {
                          setOpenEdit(sub._id);
                        }
                      }}
                    />
                    <div
                      className={
                        openEdit === sub._id
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
                        onClick={() => pushEdit(sub.slug)}
                      >
                        <span> Edit </span>
                      </button>
                      <button
                        type="button"
                        className={styles.EditRow}
                        style={{ color: mutation.isLoading ? 'black' : 'red' }}
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
                              deleteHandler(sub._id);
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

export default SubCategoryList;
