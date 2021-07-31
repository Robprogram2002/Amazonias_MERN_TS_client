import ListHead from '@components/Layout/Cards/ListHead';
import DepartmentList from '@components/Layout/Tables/DepartmentList';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const DepartmemtsListPage = () => (
  <AdminMenu selectedKey="departments" openKey="departments/create">
    <div style={{ height: '20px' }} />
    <ListHead width="100%" title="List of departments" />
    <DepartmentList />
  </AdminMenu>
);

export default DepartmemtsListPage;
