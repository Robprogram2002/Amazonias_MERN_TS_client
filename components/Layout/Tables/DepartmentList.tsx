import { fetchDepartments } from 'api/products/departments';
import { useQuery } from 'react-query';
import { IDepartment } from 'types/Department';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import SearchInput from '@components/Forms/Fields/SearchInput';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const DepartmentList = () => {
  const { data, isLoading } = useQuery('fetch-departments', fetchDepartments, {
    onError: (error) => {
      onErrorHandler(error);
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
                <DashOutlined />
              </td>
            </tr>
          )}
          {data &&
            data.data.map((department: IDepartment) => (
              <tr>
                <td>
                  <div>
                    <input type="checkbox" value="" />
                  </div>
                </td>
                <td> {department._id} </td>
                <td>
                  <b> {department.name} </b>
                </td>
                <td> {`${department.description.substring(0, 40)}  ...`} </td>
                <td> {department.slug} </td>
                <td> 30 </td>
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

export default DepartmentList;
