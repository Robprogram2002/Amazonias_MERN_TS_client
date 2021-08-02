import CreateProductForm from '@components/Forms/departments/CreateProductForm';
import ProductHead from '@components/Layout/Cards/ProductHead';
import AdminMenu from '@components/Navigation/menus/AdminMenu';
import { useState } from 'react';

const ProductsCreatePage = () => {
  const [productOption, setProductOption] = useState('simple');

  return (
    <AdminMenu selectedKey="products" openKey="products/create">
      <ProductHead
        width="550px"
        title="Add new category"
        update={false}
        setSelectOption={setProductOption}
      />
      <CreateProductForm type={productOption} product={null} />
      <div style={{ height: '30px' }} />
    </AdminMenu>
  );
};

export default ProductsCreatePage;
