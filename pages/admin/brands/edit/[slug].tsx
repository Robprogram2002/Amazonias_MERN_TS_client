import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import onErrorHandler from 'api/authentication/onErrorHandler';
import CreateBrandForm from '@components/Forms/departments/CreateBrandForm';
import { fetchBrand } from '@api/products/brands';

const EditBrandPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-brand', slug],
    () => fetchBrand(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <AdminMenu selectedKey="brands" openKey="brands/edit">
      <FormHead
        width="550px"
        title={isLoading ? 'Loading ....' : 'Edit Brand'}
        update
      />
      {data && <CreateBrandForm brand={data} />}
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};

export default EditBrandPage;
