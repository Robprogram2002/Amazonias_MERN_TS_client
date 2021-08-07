import ListHead from '@components/Layout/Cards/ListHead';
import ProductList from '@components/Layout/Tables/ProductList';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ProductsListPage = () => (
  <AdminMenu selectedKey="products" openKey="products/list">
    <div style={{ height: '20px' }} />
    <ListHead
      width="100%"
      title="List of products"
      redirect="/admin/products/create"
    />
    <ProductList />
  </AdminMenu>
);

export default ProductsListPage;
