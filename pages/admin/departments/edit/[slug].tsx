import CreateDepartmentForm from '@components/Forms/departments/CreateDepartmentForm';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import FormHead from '@components/Layout/Cards/FormHead';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchOneDepartment } from 'api/products/departments';
import onErrorHandler from 'api/authentication/onErrorHandler';

const UpdateDepartment = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-sub', slug],
    () => fetchOneDepartment(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <AdminMenu selectedKey="departments" openKey="">
      <FormHead
        width="550px"
        title={isLoading ? 'Loading ...' : 'Edit department'}
        update
      />
      {data && <CreateDepartmentForm department={data.data} />}
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};
export default UpdateDepartment;
