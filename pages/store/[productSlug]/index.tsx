import { LoadingOutlined } from '@ant-design/icons';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { fetchPageProduct } from '@api/products/products';
import Center from '@components/Layout/Containers/Center';
import ProductPageCarousel from '@components/Products/Carousel/ProductPageCarousel';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CartDrawer from '@components/Layout/Drawers/CartDrawer';
import Questions from '@components/Products/PageSections/Questions';
import Header from '@components/Products/PageSections/Header';
import Description from '@components/Products/PageSections/Description';
import Details from '@components/Products/PageSections/Details';
import Reviews from '@components/Products/PageSections/Reviews';
import styles from '../store.module.scss';

const ProductPage = () => {
  const router = useRouter();
  const slug = router.query.productSlug as string;

  const { isLoading, data } = useQuery(
    ['fetch-product-page', slug],
    () => fetchPageProduct(slug),
    {
      onError: (error) => onErrorHandler(error),
    }
  );

  if (isLoading) {
    return (
      <Center>
        <LoadingOutlined />
      </Center>
    );
  }

  return (
    <div>
      {data && <Header product={data.product} />}
      <div className={styles.Section}>
        <h2> {`More products in "${data?.product.categoryId.name}"`} </h2>
        {data && (
          <ProductPageCarousel products={data.productsOntheSameCategory} />
        )}
      </div>
      <div className={styles.Section}>
        <h2> {`Other products by "${data?.product.vendor.name}"`} </h2>
        {data && (
          <ProductPageCarousel products={data.productsOntheSameCategory} />
        )}
      </div>
      <div className={styles.Section}>
        <Description />
      </div>
      <div className={styles.Section}>
        {data && <Details details={data.product.details} />}
      </div>
      <div className={styles.Section}>
        {data && (
          <Questions
            productId={data.product._id}
            productSlug={data.product.slug}
          />
        )}
      </div>
      <div className={styles.Section}>
        {data && (
          <Reviews
            productId={data.product._id}
            productSlug={data.product.slug}
            averageRate={data.product.averageRate}
            ratings={data.product.ratings}
          />
        )}
      </div>
      <div className={styles.Section}>
        <h2>Related Products</h2>
        {data && <ProductPageCarousel products={data.relatedProducts} />}
      </div>

      {data?.baseOnHistory ? (
        <div className={styles.Section}>
          <h2> Base on your history search </h2>
          <ProductPageCarousel products={data.baseOnHistory} />
        </div>
      ) : (
        <div className={styles.Section}>
          <h2>Other products from the same brand</h2>
          {data && <ProductPageCarousel products={data.relatedProducts} />}
        </div>
      )}
      <CartDrawer
        product={data!.product}
        relatedProducts={data!.relatedProducts.slice(0, 3)}
      />
    </div>
  );
};

export default ProductPage;
