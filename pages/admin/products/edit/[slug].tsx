import AdminMenu from '@components/Navigation/menus/AdminMenu';

const EditProduct = () => (
  <AdminMenu selectedKey="products" openKey="products/create">
    <h1>Edit product</h1>
  </AdminMenu>
);

export default EditProduct;
