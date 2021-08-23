import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProduct } from 'types/Product';
import ProductCard from '../Card/ProductCard';

import styles from './ProductCarousel.module.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

const ProductPageCarousel = ({ products }: { products: IProduct[] }) => (
  <div className={styles.Container}>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div className={styles.CarouselPageSlide}>
          {products.slice(0, 4).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.CarouselPageSlide}>
          {products.slice(4, 8).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.CarouselPageSlide}>
          {products.slice(8, 12).map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);

export default ProductPageCarousel;
