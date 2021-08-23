import { useMutation } from 'react-query';
import { Select } from 'antd';
import { useContext } from 'react';
import { authContext } from '@context/AuthContext';
import { editProductQuantity, removeProductFromCart } from '@api/cart';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { checkOutContext } from '@context/CheckOutContext';
import { useRouter } from 'next/router';
import { editProductFromLS, removeProductFromLS } from 'utils/cartFunctions';
import { cartContext } from '@context/CartContext';
import { IProduct } from 'types/Product';
import styles from './cart.module.scss';

const { Option } = Select;

const range = (min: number, max: number) => {
  const arr = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  return arr;
};

const UserCartPage = () => {
  const { authenticated } = useContext(authContext);
  const { cart, editProductCart, removeProductCart, setCartData } =
    useContext(cartContext);
  const {
    state: { menuData },
  } = useContext(checkOutContext);
  const router = useRouter();

  const editMutation = useMutation(
    'edit-product-cart-quantity',
    editProductQuantity,
    {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          editProductCart({ ...data });
        }
      },
      onError: (error) => onErrorHandler(error),
    }
  );

  const removeMutation = useMutation(
    'remove-product-car',
    removeProductFromCart,
    {
      onSuccess: ({ data, status }) => {
        if (status === 200) {
          removeProductCart({ ...data });
        }
      },
      onError: (error) => onErrorHandler(error),
    }
  );

  const removeHandler = (productId: string, price: number, count: number) => {
    if (!authenticated) {
      setCartData(removeProductFromLS({ productId, price, count }));
    } else {
      removeMutation.mutate({ productId, price });
    }
  };

  const editHandler = ({
    quantity,
    product,
  }: {
    quantity: number;
    product: IProduct;
  }) => {
    if (!authenticated) {
      setCartData(
        editProductFromLS({
          price: product.basePrice,
          productId: product._id,
          quantity,
        })
      );
    } else {
      editMutation.mutate({
        productId: product._id,
        price: product.basePrice,
        quantity,
      });
    }
  };

  const checkOutHandler = () => {
    if (cart) {
      setCartData(cart);
      router.push(`/user/checkout/${menuData[0].title}`);
    }
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#e4e4e4' }}>
      <div className={styles.Container}>
        <div className={styles.ShoppingCart}>
          <h1>
            {cart && cart.products.length > 0
              ? 'Shopping Cart'
              : 'Your Amazonias cart is empty'}
          </h1>
          <div className={styles.ProductList}>
            {cart &&
              cart.products.length > 0 &&
              cart.products.map(({ product, count }) => (
                <div className={styles.ProductCard} key={product._id}>
                  <img src={product.images[0].url} alt="asnjdnksa" />
                  <div>
                    <h3> {product.title} </h3>
                    <span className={styles.Price}>
                      $ {product.basePrice} {product.currency}
                    </span>
                    <span className={styles.Availability}>
                      {product.availability}
                    </span>
                    <div className={styles.Options}>
                      <strong>Qty :</strong>
                      <Select
                        loading={editMutation.isLoading}
                        className={styles.SelectInput}
                        size="small"
                        value={count}
                        onChange={(e) => editHandler({ product, quantity: e })}
                      >
                        {range(1, product.stock - 1).map((integer) => (
                          <Option value={integer}> {integer} </Option>
                        ))}
                      </Select>
                      <span
                        className={styles.TextLink}
                        onClick={() =>
                          removeHandler(product._id, product.basePrice, count)
                        }
                        onKeyDown={() =>
                          removeHandler(product._id, product.basePrice, count)
                        }
                        role="button"
                        tabIndex={0}
                      >
                        Delete
                      </span>
                      <span className={styles.TextLink}> Save for Later </span>
                      <span className={styles.TextLink}>
                        Compare with similar items
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <h2>
            Subtotal (
            {cart
              ? cart.products.reduce(
                  (count, element) => element.count + count,
                  0
                )
              : 0}{' '}
            items ): <span>$ {cart?.totalAmount || 0.0} </span>
          </h2>
        </div>
        <div className={styles.RigthColum}>
          <div className={styles.Summary}>
            <h2>
              Subtotal ($
              {cart?.products.reduce(
                (count, element) => element.count + count,
                0
              )}{' '}
              items ): <span>$ {cart?.totalAmount} </span>
            </h2>
            <button
              type="button"
              className={styles.ProceedButton}
              disabled={cart === null || cart.products.length === 0}
              onClick={checkOutHandler}
            >
              Proceed to checkout
            </button>
          </div>
          <div className={styles.FeaturedProducts}>
            <h3>Featured products related to items in your cart</h3>
            <div style={{ height: '400px' }} />
          </div>
        </div>
      </div>

      <p style={{ backgroundColor: 'white', marginTop: '1.4rem' }}>
        {JSON.stringify(cart)}
      </p>
    </div>
  );
};

export default UserCartPage;
