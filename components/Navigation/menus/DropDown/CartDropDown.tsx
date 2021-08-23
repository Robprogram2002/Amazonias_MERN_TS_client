import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FiShoppingCart } from 'react-icons/fi';
import { cartContext } from '@context/CartContext';
import { useMutation } from 'react-query';
import { createPaymentSession } from '@api/cart';
import onErrorHandler from '@api/authentication/onErrorHandler';
import getStripe from '../../../../utils/get_stripe';
import styles from './CartDropDown.module.scss';

const CartDropDown = () => {
  const { cart } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { mutate } = useMutation('checkout-redirect', createPaymentSession, {
    onSuccess: async ({ data }) => {
      const stripe = await getStripe();
      const { error } = await stripe!.redirectToCheckout({
        sessionId: data,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      console.warn(error.message);
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const redirectToCart = () => router.push('/user/cart');

  const items =
    cart.products.length > 0
      ? cart.products.reduce((count, element) => element.count + count, 0)
      : 0;

  return (
    <div
      className={styles.CartContainer}
      // onClick={redirectToCart}
      // onKeyDown={redirectToCart}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="menuitem"
      tabIndex={0}
    >
      <FiShoppingCart size={36} />
      <span>Cart</span>
      <div className={styles.CartCount}>
        <span> {items} </span>
      </div>
      <div
        className={styles.DropDownContainer}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className={styles.Row}>
          <h2>{items} ITEMS</h2>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h2
            className={styles.TextLink}
            onClick={redirectToCart}
            onKeyDown={redirectToCart}
          >
            Go to Cart
          </h2>
        </div>
        <div className={styles.ProductList}>
          {cart.products.map(({ product, count }) => (
            <div className={styles.ProductCard} key={product._id}>
              <img src={product.images[0].url} alt="ansjdnjs" />
              <div>
                <h3> {`${product.title.substring(0, 55)} ...`} </h3>
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
        <div className={styles.Row}>
          <h2>SUBTOTAL :</h2>
          <span>$ {cart.totalAmount || 0.0} </span>
        </div>
        <button
          type="button"
          className={styles.ProceedButton}
          onClick={(e) => {
            e.preventDefault();
            mutate(cart);
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartDropDown;
