import { useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { filterByText } from 'api/products/subCategories';
import { fetchCategories } from 'api/products/categories';
import { ISubCategory } from 'types/SubCategory';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import { ChangeEvent, useEffect, useState } from 'react';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[] | null>(
    null
  );
  const [selectOption, setSelectOption] = useState('');
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);

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

  const categories = useQuery('fetch-departments', fetchCategories, {
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

export default SubCategoryList;
