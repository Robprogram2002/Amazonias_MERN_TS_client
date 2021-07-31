import { useEffect, useState } from 'react';
import { filterByText } from 'api/products/departments';
import { useQuery } from 'react-query';
import { IDepartment } from 'types/Department';
import { DashOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import onErrorHandler from 'api/authentication/onErrorHandler';
import SimpleIcon from '@components/UI/Icons/SimpleIcon';
import Center from '../Containers/Center';
import Table from './Table';
import styles from './DepartmentList.module.scss';

const DepartmentList = () => {
  const [departments, setDepartments] = useState<IDepartment[] | null>(null);
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState<any | null>(null);

  const { isLoading, refetch } = useQuery(
    ['filter-departments', value],
    () => filterByText(value),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setDepartments(data);
        }
      },
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

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
          {departments &&
            departments.map((department: IDepartment) => (
              <tr key={department._id}>
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
