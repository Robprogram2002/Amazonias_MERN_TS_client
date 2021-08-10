import AdminMenu from '@components/Navigation/menus/AdminMenu';
import FormHead from '@components/Layout/Cards/FormHead';
import CreateVendorForm from '@components/Forms/departments/CreateVendorForm';

const CreateVendorPage = () => (
  <AdminMenu selectedKey="vendors" openKey="vendors/create">
    <FormHead width="550px" title="Add new vendor" update={false} />
    <CreateVendorForm vendor={null} />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default CreateVendorPage;
