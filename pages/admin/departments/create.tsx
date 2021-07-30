import CreateDepartmentForm from '@components/Forms/departments/CreateDepartmentForm';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import FormHead from '@components/Layout/Cards/FormHead';

const DepartmemtsCreatePage = () => (
  <AdminMenu selectedKey="departments" openKey="departments/create">
    <FormHead width="550px" title="Add new department" />
    <CreateDepartmentForm />
    <div style={{ height: '30px' }} />
  </AdminMenu>
);

export default DepartmemtsCreatePage;
