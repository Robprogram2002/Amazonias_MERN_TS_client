import AdminMenu from '@components/Navigation/menus/AdminMenu';
import FormHead from '@components/Layout/Cards/FormHead';
import CreateVendorForm from '@components/Forms/departments/CreateVendorForm';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchVendor } from '@api/products/vendors';
import onErrorHandler from '@api/authentication/onErrorHandler';

const EditVendorPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-sub', slug],
    () => fetchVendor(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <AdminMenu selectedKey="vendors" openKey="vendors/edit">
      <FormHead
        width="100%"
        title={isLoading ? 'Loading ....' : 'Edit Vendor'}
        update
      />
      {data && <CreateVendorForm vendor={data} />}
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};
export default EditVendorPage;
