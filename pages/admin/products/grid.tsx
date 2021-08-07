import ListHead from '@components/Layout/Cards/ListHead';
import ProductGrid from '@components/Layout/Grids/ProductGrid';
import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ProductsGridPage = () => (
  <AdminMenu selectedKey="products" openKey="products/grid">
    <div style={{ height: '20px' }} />
    <ListHead
      width="100%"
      title="List of products"
      redirect="/admin/products/create"
    />
    <ProductGrid />
  </AdminMenu>
);

export default ProductsGridPage;
