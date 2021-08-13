import { fetchPageProduct } from '@api/products/products';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const ProductPage = () => {
  const router = useRouter();
  const slug = router.query.productSlug as string;

  const { isLoading, data } = useQuery(['fetch-product-page', slug], () =>
    fetchPageProduct(slug)
  );

  console.log(router.query);

  return (
    <div>
      {data && JSON.stringify(data)}
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
};

export default ProductPage;
