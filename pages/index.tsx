import { Loading3QuartersOutlined } from '@ant-design/icons';
import { fetchHomeProducts } from '@api/products/products';
import HomeCategoriesGrid from '@components/Layout/Grids/HomeCategoriesGrid';
import HomeGrid from '@components/Layout/Grids/HomeGrid';
import ProductCarousel from '@components/Products/Carousel/ProductCarousel';
import HomeCarousel from '@components/UI/Carousels/HomeCarousel';
import { useQuery } from 'react-query';

export default function Home() {
  const { isLoading, data } = useQuery(
    'fetch-home-products',
    fetchHomeProducts
  );

  return (
    <div style={{ width: '100%', backgroundColor: '#e4e4e4' }}>
      <HomeCarousel />
      <HomeGrid />
      {isLoading && <Loading3QuartersOutlined size={100} />}
      {data && (
        <ProductCarousel
          title="Best seller products"
          products={data.mostSoldProducts}
        />
      )}
      <div style={{ height: '10px' }} />
      {data && (
        <ProductCarousel
          title="Most recently added"
          products={data.recentProducts}
        />
      )}
      <HomeCategoriesGrid />

      {data && (
        <ProductCarousel
          title="Products On Sale"
          products={data.onSaleProducts}
        />
      )}
      <div style={{ height: '10px' }} />
      {data && (
        <ProductCarousel
          title="Most reviwed products"
          products={data.mostRatingProducts}
        />
      )}
    </div>
  );
}
