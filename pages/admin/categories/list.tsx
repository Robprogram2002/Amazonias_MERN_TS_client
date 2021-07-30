import AdminMenu from '@components/Navigation/menus/AdminMenu';

const CategoriesListPage = () => (
  <AdminMenu selectedKey="categories" openKey="categories/list">
    <h1>Hello , here is the list pf departments </h1>
  </AdminMenu>
);

export default CategoriesListPage;
