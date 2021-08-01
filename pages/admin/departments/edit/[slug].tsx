import CreateDepartmentForm from '@components/Forms/departments/CreateDepartmentForm';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import FormHead from '@components/Layout/Cards/FormHead';

const UpdateDepartment = () => (
  <AdminMenu selectedKey="departments" openKey="">
    <FormHead width="550px" title="Edit department" update />
    <CreateDepartmentForm />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default UpdateDepartment;
