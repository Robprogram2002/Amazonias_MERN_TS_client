import CreateCategoryForm from '@components/Forms/departments/CreateCategoryForm';
import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const CategoriesCreatePage = () => (
  <AdminMenu selectedKey="categories" openKey="categories/create">
    <FormHead width="550px" title="Add new category" update={false} />
    <CreateCategoryForm category={null} />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default CategoriesCreatePage;
