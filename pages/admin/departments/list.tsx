import AdminMenu from '@components/Navigation/menus/AdminMenu';

const DepartmemtsListPage = () => (
  <AdminMenu selectedKey="departments" openKey="departments/create">
    <h1>Hello , here is the list pf departments </h1>
  </AdminMenu>
);

export default DepartmemtsListPage;
