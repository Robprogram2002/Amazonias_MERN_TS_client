import { HiArrowNarrowRight } from 'react-icons/hi';
import styles from './OrderDetailsCard.module.scss';

const OrderDetailsCard = () => (
  <div className={styles.Container}>
    <div className={styles.Card}>
      <div className={styles.Head}>
        <div className={styles.HeadItem}>
          <div className={styles.IconContainer}>
            <div className={styles.Icon}>
              <HiArrowNarrowRight />
            </div>
          </div>
          <div className={styles.ItemInfo}>
            <h4>Customer</h4>
            <span>John Alexander</span>
            <span>alex@example.com</span>
            <span>+998 99 22123456</span>
          </div>
        </div>
        <div className={styles.HeadItem}>
          <div className={styles.IconContainer}>
            <div className={styles.Icon}>
              <HiArrowNarrowRight />
            </div>
          </div>
          <div className={styles.ItemInfo}>
            <h4>Order Info</h4>
            <span>Shipping: Fargo express</span>
            <span>Pay method: card</span>
            <span>Region: Mexico, Villahermosa</span>
          </div>
        </div>
        <div className={styles.HeadItem}>
          <div className={styles.IconContainer}>
            <div className={styles.Icon}>
              <HiArrowNarrowRight />
            </div>
          </div>
          <div className={styles.ItemInfo}>
            <h4>Deliver to</h4>
            <span>Block A, House 123, Floor 2 Po Box 10000</span>
            <span>zip: 86270</span>
          </div>
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.Cart}>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.TableProduct}>
                  <img src="" alt="" /> <span>Pure glow cream</span>
                </td>
                <td className={styles.TableData}>$44.25</td>
                <td className={styles.TableData}>3</td>
                <td className={styles.DataPrice}>$99.50</td>
              </tr>
              <tr>
                <td className={styles.TableProduct}>
                  <img src="" alt="" /> <span>Pure glow cream</span>
                </td>
                <td className={styles.TableData}>$44.25</td>
                <td className={styles.TableData}>3</td>
                <td className={styles.DataPrice}>$99.50</td>
              </tr>
              <tr>
                <td />
                <td />
                <td className={styles.Summary}>
                  <span>Subtotal:</span>
                  {/* <div className={styles.Coupon}>
                        <div className={styles.Code}>FRIENDS20</div>
                        <span>10% off</span>
                      </div> */}
                  <span>Shipping cost:</span>
                  <span>Sales tax (6.5%):</span>
                  <span>Total due</span>
                </td>
                <td className={`${styles.Summary} ${styles.DataPrice}`}>
                  <span>$129.00</span>
                  {/* <span>-$12.90</span> */}
                  <span>$5.00</span>
                  <span>$4.23</span>
                  <span>$169.00</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <CardForm /> */}
      </div>
    </div>
  </div>
);

export default OrderDetailsCard;
