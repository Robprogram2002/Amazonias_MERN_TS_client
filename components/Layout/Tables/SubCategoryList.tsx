import { useQuery } from 'react-query';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import { fetchSubCategories } from 'api/products/subCategories';
import { fetchCategories } from 'api/products/categories';
import { ISubCategory } from 'types/SubCategory';
import SearchInput from '@components/Forms/Fields/SearchInput';
import FilterSelect from '@components/Forms/Fields/FilterSelect';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const SubCategoryList = () => {
  const { data, isLoading } = useQuery(
    'fetch-sub-categories',
    fetchSubCategories,
    {
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
            data.data.map((category: ISubCategory) => (
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
                <td> {category.slug} </td>
                <td> 30 </td>
                <td> {category.categoryId} </td>
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
