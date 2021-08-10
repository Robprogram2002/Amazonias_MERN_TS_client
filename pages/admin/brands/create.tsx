import CreateBrandForm from '@components/Forms/departments/CreateBrandForm';
import FormHead from '@components/Layout/Cards/FormHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const CreateBrandPage = () => (
  <AdminMenu selectedKey="brands" openKey="brands/create">
    <FormHead width="550px" title="Add new Brand" update={false} />
    <CreateBrandForm brand={null} />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default CreateBrandPage;
