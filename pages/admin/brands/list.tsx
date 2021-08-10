import ListHead from '@components/Layout/Cards/ListHead';
import BrandGrid from '@components/Layout/Grids/BrandGrid';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ListBrandsPage = () => (
  <AdminMenu selectedKey="brands" openKey="brands/list">
    <div style={{ height: '20px' }} />
    <ListHead
      width="100%"
      title="List of brands"
      redirect="/admin/brands/create"
    />
    <BrandGrid />
  </AdminMenu>
);

export default ListBrandsPage;
