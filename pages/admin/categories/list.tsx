import ListHead from '@components/Layout/Cards/ListHead';
import CategoryList from '@components/Layout/Tables/CategoryList';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const CategoriesListPage = () => (
  <AdminMenu selectedKey="categories" openKey="categories/list">
    <div style={{ height: '20px' }} />
    <ListHead width="100%" title="List of categories" />
    <CategoryList />
  </AdminMenu>
);

export default CategoriesListPage;
