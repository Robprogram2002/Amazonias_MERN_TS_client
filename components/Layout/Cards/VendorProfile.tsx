import { VendorWithProducts } from 'types/Vendor';
import { EditFilled } from '@ant-design/icons';
import styles from './VendorProfile.module.scss';

const VendorProfile = ({ vendor }: { vendor: VendorWithProducts }) => (
  <>
    <div className={styles.Container}>
      <div className={styles.HeaderContainer}>
        <div className={styles.Background} />
        <img src={vendor.image.url} alt="asndkj" />
        <div className={styles.HeaderContent}>
          <div />
          <div>
            <h2> {vendor.name} </h2>
            <p>
              {`${vendor.location.address} , ${vendor.location.state}  ${vendor.location.postalCode}`}
            </p>
          </div>
          <div className={styles.ButtonsContainer}>
            <button type="button">
              <EditFilled className={styles.Icon} />
              <span>Edit Vendor</span>
            </button>
            <button type="button"> Options </button>
          </div>
        </div>
      </div>
      <div className={styles.Bottom}>
        <div className={styles.TextContent}>
          <div className={styles.SalesContainer}>
            <div className={styles.Sales}>
              <div className={styles.Item}>
                <p>Total Sales:</p>
                <span> {vendor.sales} </span>
              </div>
              <div className={styles.Item}>
                <p>Revenue:</p>
                <span> {`$ ${vendor.revenue}`} </span>
              </div>
            </div>
          </div>
          <div className={styles.TextList}>
            <h3>Contacts</h3>
            <p> {`Manager : ${vendor.contact.person}`} </p>
            <p> {`Email : ${vendor.contact.email}`} </p>
            <p> {`Phone : ${vendor.contact.phone}`} </p>
          </div>
          <div className={styles.TextList}>
            <h3> Address </h3>
            <p>
              {`State : ${vendor.location.country} , ${vendor.location.state}`}
            </p>
            <p>
              {`Address : ${vendor.location.address} , ${vendor.location.postalCode}`}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.ProductsContainer}>
      <h3>Products By Seller</h3>
      <div className={styles.GridContainer}>
        {vendor.products.map((product) => (
          <div className={styles.ProductCard} key={product._id}>
            <div className={styles.Head}>
              <img
                src={
                  product.type === 'simple'
                    ? product.images[0].url
                    : product.productVariants![0].images[0].url
                }
                alt="product first representation"
              />
            </div>
            <div className={styles.Bottom}>
              <p> {product.title} </p>
              <span>
                {`${
                  product.basePrice || product.productVariants![0].basePrice
                } ${product.currency || product.productVariants![0].currency}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default VendorProfile;
