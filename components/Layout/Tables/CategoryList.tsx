import { useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { filterByText } from 'api/products/categories';
import { ICategory } from 'types/Category';
import { fetchDepartments } from 'api/products/departments';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const CategoryList = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [selectOption, setSelectOption] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);

  const { isLoading, refetch } = useQuery(
    ['filter-categories', value, selectOption],
    () => filterByText(value, selectOption),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setCategories(data);
          console.log(data);
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
      </div>
      <Table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Slug</th>
            <th>Order</th>
            <th> Department </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category: ICategory) => (
              <tr key={category._id}>
                <td>
                  <div>
                    <input type="checkbox" value="" />
                  </div>
                </td>
                <td> {category._id} </td>
                <td>
                  <b> {category.name} </b>
                </td>
                <td> {`${category.description.substring(0, 40)}  ...`} </td>
                <td> {category.slug} </td>
                <td> 30 </td>
                <td> {category.department[0]!.name} </td>
                <td>
                  <Center>
                    <SimpleIcon
                      icon={
                        <DashOutlined
                          size={30}
                          style={{ fontWeight: 'bold' }}
                        />
                      }
                      outline
                      handler={() => {}}
                    />
                  </Center>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default CategoryList;
