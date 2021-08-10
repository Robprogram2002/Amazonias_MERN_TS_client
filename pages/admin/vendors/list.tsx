import ListHead from '@components/Layout/Cards/ListHead';
import VendorGrid from '@components/Layout/Grids/VendorGrid';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ListBrandsPage = () => (
  <AdminMenu selectedKey="vendors" openKey="vendors/list">
    <div style={{ height: '20px' }} />
    <ListHead
      width="100%"
      title="List of Vendors"
      redirect="/admin/vendors/create"
    />
    <VendorGrid />
  </AdminMenu>
);

export default ListBrandsPage;
