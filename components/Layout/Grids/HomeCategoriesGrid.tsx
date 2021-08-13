import styles from './HomeGrid.module.scss';

const HomeCategoriesGrid = () => (
  <div className={styles.Container}>
    <div className={styles.GridCard}>
      <h3>Comfy styles for her</h3>
      <div className={styles.GridOptions}>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606963/amazonias/alienware-Hpaq-kBcYHk-unsplash.jpg/1628606960083.jpg"
            alt="asl kasd lksad"
          />
          <p>Computers & Accessories</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628607035/amazonias/jordan-harrison-40XgDxBfYXM-unsplash.jpg/1628607034058.jpg"
            alt="asl kasd lksad"
          />
          <p>Video Games</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606365/amazonias/fe-ngo-bvx3G7RkOts-unsplash.jpg/1628606363676.jpg"
            alt="asl kasd lksad"
          />
          <p>Baby</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606200/amazonias/pexels-pixabay-159644.jpg/1628606193415.jpg"
            alt="asl kasd lksad"
          />
          <p>Toy & Games</p>
        </div>
      </div>
      <span>See more</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Shop Laptops & Tablets</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606537/amazonias/federico-bottos-TuAtSs8peoM-unsplash.jpg/1628606536326.jpg"
        alt="asndjkksda"
      />
      <span>See more</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Explore home bedding</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628607139/amazonias/outsite-co-R-LK3sqLiBw-unsplash.jpg/1628607133503.jpg"
        alt="asnjkdasndjk"
      />
      <span>Learn more</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Gaming merchandise</h3>
      <div className={styles.GridOptions}>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606963/amazonias/alienware-Hpaq-kBcYHk-unsplash.jpg/1628606960083.jpg"
            alt="asl kasd lksad"
          />
          <p>Computers & Accessories</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628607035/amazonias/jordan-harrison-40XgDxBfYXM-unsplash.jpg/1628607034058.jpg"
            alt="asl kasd lksad"
          />
          <p>Video Games</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606365/amazonias/fe-ngo-bvx3G7RkOts-unsplash.jpg/1628606363676.jpg"
            alt="asl kasd lksad"
          />
          <p>Baby</p>
        </div>
        <div className={styles.Option}>
          <img
            src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606200/amazonias/pexels-pixabay-159644.jpg/1628606193415.jpg"
            alt="asl kasd lksad"
          />
          <p>Toy & Games</p>
        </div>
      </div>
      <span>See more</span>
    </div>
  </div>
);

export default HomeCategoriesGrid;
