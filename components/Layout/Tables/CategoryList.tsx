import { useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { fetchCategories } from 'api/products/categories';
import { ICategory } from 'types/Category';
import SearchInput from '@components/Forms/Fields/SearchInput';
import { fetchDepartments } from 'api/products/departments';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const CategoryList = () => {
  const { data, isLoading } = useQuery('fetch-categories', fetchCategories, {
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const departments = useQuery('fetch-departments', fetchDepartments, {
    onError: (err) => {
      onErrorHandler(err);
    },
  });

  return (
    <>
      <div className={styles.FilterContainer}>
        <SearchInput
          width="400px"
          placeholder="Filter ..."
          withIcon={false}
          handler={() => {}}
        />

        <div style={{ width: '200px' }}>
          <FilterSelect
            handler={() => {}}
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
          {isLoading && (
            <tr>
              <td>
                <div>
                  <input type="checkbox" value="" />
                </div>
              </td>
              <td>
                {' '}
                <Loading3QuartersOutlined />{' '}
              </td>
              <td>
                <b>
                  {' '}
                  <Loading3QuartersOutlined />{' '}
                </b>
              </td>
              <td>
                {' '}
                <Loading3QuartersOutlined />{' '}
              </td>
              <td>
                {' '}
                <Loading3QuartersOutlined />{' '}
              </td>
              <td> 30 </td>
              <td>
                {' '}
                <Loading3QuartersOutlined />{' '}
              </td>
              <td>
                <DashOutlined />
              </td>
            </tr>
          )}
          {data &&
            data.data.map((category: ICategory) => (
              <tr>
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
                <td> {category.departmentId} </td>
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
