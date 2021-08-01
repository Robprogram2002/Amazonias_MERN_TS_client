import CreateCategoryForm from '@components/Forms/departments/CreateCategoryForm';
import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { fetchOneCategory } from 'api/products/categories';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const UpdateCategory = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-sub', slug],
    () => fetchOneCategory(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );
  return (
    <AdminMenu selectedKey="categories" openKey="">
      <FormHead
        width="550px"
        title={isLoading ? 'Loading...' : 'Edit category'}
        update
      />
      {data && <CreateCategoryForm category={data.data} />}
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};
export default UpdateCategory;
