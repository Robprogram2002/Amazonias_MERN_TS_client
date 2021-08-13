// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './HomeCarousel.module.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, A11y]);

const HomeCarousel = () => (
  <div className={styles.CarouselContainer}>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation
      // pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className={styles.Carousel}>
          <h1>Hello World </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.Carousel}>
          <h1>Hello World </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.Carousel}>
          <h1>Hello World </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.Carousel}>
          <h1>Hello World </h1>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
);

export default HomeCarousel;
