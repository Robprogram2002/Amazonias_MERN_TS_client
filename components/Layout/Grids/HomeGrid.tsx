import styles from './HomeGrid.module.scss';

const HomeGrid = () => (
  <div className={styles.Container}>
    <div className={styles.GridCard}>
      <h3>Amazon Basics</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606537/amazonias/federico-bottos-TuAtSs8peoM-unsplash.jpg/1628606536326.jpg"
        alt="asndjkksda"
      />
      <span>See more</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Easy Returns</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628607139/amazonias/outsite-co-R-LK3sqLiBw-unsplash.jpg/1628607133503.jpg"
        alt="asnjkdasndjk"
      />
      <span>Learn more</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Computers & Accesories</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628606496/amazonias/felix-mittermeier-nAjil1z3eLk-unsplash.jpg/1628606494013.jpg"
        alt="ansjdnjksa"
      />
      <span>See more</span>
    </div>
    <div className={styles.SignInCard}>
      <div className={styles.Head}>
        <h3>Sign in for the best experience</h3>
        <button type="button">Sign in securely</button>
      </div>
      <img
        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_D2_45M_en_US_1x._CB418309979_.jpg"
        alt="ansjkdkj"
      />
    </div>

    <div className={styles.GridCard}>
      <h3>Oculus</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628625966/amazonias/giu-vicente-FMArg2k3qOU-unsplash.jpg/1628625963694.jpg"
        alt="askjdnaskdas"
      />
      <span>Shop now</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Shop By Category</h3>
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
      <span>Shop now</span>
    </div>
    <div className={styles.GridCard}>
      <h3>Gamming Accesories</h3>
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
      <h3>Get fit at home</h3>
      <img
        src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628626101/amazonias/jarek-ceborski-jn7uVeCdf6U-unsplash.jpg/1628626097851.jpg"
        alt="askdasdlk"
      />
      <span>Shop now</span>
    </div>
  </div>
);

export default HomeGrid;
