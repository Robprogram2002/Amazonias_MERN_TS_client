import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ProductsListPage = () => (
  <AdminMenu selectedKey="products" openKey="products/list">
    <h1>Hello , here is the list of products</h1>
  </AdminMenu>
);

export default ProductsListPage;
