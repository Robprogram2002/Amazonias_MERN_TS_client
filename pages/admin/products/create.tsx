import AdminMenu from '@components/Navigation/menus/AdminMenu';

const ProductsCreatePage = () => (
  <AdminMenu selectedKey="products" openKey="products/create">
    <h1>Hello , Add a new Product</h1>
  </AdminMenu>
);

export default ProductsCreatePage;
