import ListHead from '@components/Layout/Cards/ListHead';
import SubCategoryList from '@components/Layout/Tables/SubCategoryList';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const SubsListPage = () => (
  <AdminMenu selectedKey="sub-categories" openKey="sub-categories/list">
    <div style={{ height: '20px' }} />
    <ListHead
      width="100%"
      title="List of sub-categories"
      redirect="/admin/sub-categories/create"
    />
    <SubCategoryList />
  </AdminMenu>
);

export default SubsListPage;
