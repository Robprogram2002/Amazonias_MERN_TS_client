import { authContext } from '@context/AuthContext';
import { Input } from 'antd';
import { useContext } from 'react';
import { cartContext } from '@context/CartContext';
import { checkOutContext, checkOutSections } from '@context/CheckOutContext';
import { useRouter } from 'next/router';
import { ShippingAddress } from 'types/user/User';
import styles from './ShippingAddressForm.module.scss';
import AddressForm from './AddressForm';

const ShippingAddressForm = () => {
  const { user, authenticated } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const { editMenuData, setAddressData } = useContext(checkOutContext);
  const router = useRouter();

  const selectHandler = (address: ShippingAddress) => {
    setAddressData(address);
    router.push(`/user/checkout/${checkOutSections[2].title}`);
    editMenuData(1);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.FormContainer}>
        {authenticated && user && (
          <div className={styles.Border}>
            <div className={styles.Header}>
              <h1>Select A Shipping Address</h1>
              <span>
                Select a shipping address from your saved addresses or add a new
                one if is your first time
              </span>
            </div>
            <div style={{ height: '20px' }} />
            <div className={styles.AdressesContainer}>
              {user.shippingAddresses.length > 0 ? (
                user.shippingAddresses.map((address) => (
                  <div className={styles.Address} key={address._id}>
                    <h4>
                      {address.fname} {address.lname}
                    </h4>
                    <p>
                      {address.country}, {address.city}
                    </p>
                    <span>
                      Address: {address.address}, {address.zip}{' '}
                    </span>
                    <span>Email: {address.email} </span>
                    <span>Phone: {address.phone} </span>
                    <div style={{ height: '16px' }} />
                    <button
                      className={styles.SubmitButton}
                      type="button"
                      onClick={() => selectHandler(address)}
                    >
                      Use this address
                    </button>
                    <div className={styles.ButtonOptions}>
                      <button type="button">Edit</button>
                      <button type="button">Remove</button>
                    </div>
                  </div>
                ))
              ) : (
                <h3>You don&apos;t have create a shipping address yet</h3>
              )}
            </div>
          </div>
        )}
        <div className={styles.Header}>
          <h1> Add new address </h1>
          <span>
            {' '}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
            a?{' '}
          </span>
        </div>
        <div style={{ height: '20px' }} />
        <AddressForm />
      </div>

      <div className={styles.SideColumn}>
        {/* <div className={styles.HelpContact}>
          <h4> Do you need help ? </h4>
          <p>Phone : 00800 197 866 13</p>
          <p>Email : support.email@contact.com</p>
        </div> */}
        {/* <div style={{ height: '20px' }} /> */}
        <div className={styles.CartSummary}>
          <h3>Summary</h3>
          <span>
            The total amount consist of the tax, insurance and the shipping
            charge
          </span>
          <div className={styles.ChargeList}>
            <div className={styles.Charge}>
              <p>Shipping</p>
              <span> $ 148.99 </span>
            </div>
            <div className={styles.Charge}>
              <p>Tax</p>
              <span> $ 5.00 </span>
            </div>
            <div className={styles.Charge}>
              <p>Insurance</p>
              <span> $ 12.85 </span>
            </div>
          </div>
          <div className={styles.TotalAmount}>
            <p>Total</p>
            <span> $ 276.99 </span>
          </div>
        </div>
        <div style={{ height: '20px' }} />
        <div className={styles.CouponInput}>
          <h3>Apply a coupon code</h3>
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias,
            a?
          </span>
          <Input className={styles.Input} placeholder="Enter your code" />
        </div>
        <div style={{ height: '20px' }} />
        <div className={styles.CartItems}>
          <h3>Cart items</h3>
          {cart.products.map(({ product, count }) => (
            <div className={styles.ProductCard} key={product._id}>
              <img src={product.images[0].url} alt="ansjdnjs" />
              <div>
                <h3> {`${product.title.substring(0, 60)} ...`} </h3>
                <span className={styles.ProductPrice}>
                  $ {product.basePrice}
                </span>
                <span>
                  Qty: <span className={styles.Quantity}> {count} </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
