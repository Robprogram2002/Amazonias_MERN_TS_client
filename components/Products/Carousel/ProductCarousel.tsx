import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProduct } from 'types/Product';
import ProductCard from '../Card/ProductCard';

import styles from './ProductCarousel.module.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

const ProductCarousel = ({
  title,
  products,
}: {
  title: string;
  products: IProduct[];
}) => (
  <div className={styles.Container}>
    <h2> {title} </h2>

    <hr />
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className={styles.CarouselSlide}>
          {products.slice(0, 4).map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.CarouselSlide}>
          {products.slice(4, 8).map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.CarouselSlide}>
          {products.slice(8, 12).map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);

export default ProductCarousel;
