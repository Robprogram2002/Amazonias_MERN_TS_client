import CreateSubCategoryForm from '@components/Forms/departments/CreateSubCategoryForm';
import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchOneSubCategory } from 'api/products/subCategories';
import onErrorHandler from 'api/authentication/onErrorHandler';

const UpdateSubCategory = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading, data } = useQuery(
    ['fetch-sub', slug],
    () => fetchOneSubCategory(slug!),
    {
      onError: (error) => {
        onErrorHandler(error);
      },
    }
  );

  return (
    <AdminMenu selectedKey="sub-categories" openKey="">
      <FormHead
        width="550px"
        title={isLoading ? 'Loading ....' : 'Edit Sub-category'}
        update
      />
      {data && <CreateSubCategoryForm sub={data.data} />}
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};

export default UpdateSubCategory;
