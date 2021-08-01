import CreateSubCategoryForm from '@components/Forms/departments/CreateSubCategoryForm';
import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const SubsCreatePage = () => (
  <AdminMenu selectedKey="sub-categories" openKey="sub-categories/create">
    <FormHead width="550px" title="Add new Sub-category" update={false} />
    <CreateSubCategoryForm sub={null} />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default SubsCreatePage;
