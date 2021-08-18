import { useContext } from 'react';
import { appContext } from '@context/AppContext';
import { Drawer, Rate } from 'antd';
import { IProduct } from 'types/Product';
import { authContext } from '@context/AuthContext';
import { useRouter } from 'next/router';
import styles from './CartDrawer.module.scss';

const CartDrawer = ({
  product,
  relatedProducts,
}: {
  product: IProduct;
  relatedProducts: IProduct[];
}) => {
  const { state, setDrawer } = useContext(appContext);
  const { user } = useContext(authContext);
  const router = useRouter();

  const { cart } = user!;
  const items = cart.products.reduce(
    (count, element) => element.count + count,
    0
  );

  return (
    <Drawer
      title="Product Added to your cart"
      width={700}
      onClose={() => setDrawer(false)}
      visible={state.showDrawer}
      bodyStyle={{ margin: 0, padding: 0 }}
    >
      <div className={styles.Card}>
        <div className={styles.CartInfoContainer}>
          <img src={product.images[0].url} alt="aj sdjh sad h" />
          <div className={styles.CartInfo}>
            <h4>
              Cart&apos;s subtotal ({items} items) :
              <span> $ {cart.totalAmount} </span>
            </h4>
            <span className={styles.SmallText}>
              Tu pedido es elegible con envíos GRATIS Selecciona envío GRATIS
              durante la tramitación del pedido. (Existen algunas restricciones)
            </span>
            <button
              type="button"
              className={styles.CartButton}
              onClick={() => router.push('/user/cart')}
            >
              Go to cart
            </button>
            <button type="button" className={styles.PurchaseButton}>
              Go to purchase ({items} items)
            </button>
          </div>
        </div>
        <div className={styles.Recomendations}>
          <div className={styles.ProductList}>
            <h2>Discover related products</h2>
            {relatedProducts.map(
              ({
                images,
                title,
                _id,
                averageRate,
                ratings,
                basePrice,
                currency,
              }) => (
                <div className={styles.ProductCard} key={_id}>
                  <img src={images[0].url} alt="ankdjajkds" />
                  <div>
                    <h3 className={styles.TextLink}> {title} </h3>
                    <Rate allowHalf value={averageRate} disabled />
                    <span> {ratings.length} </span>
                    <span className={styles.Price}>
                      {basePrice} {currency}
                    </span>
                    <button className={styles.ProductButton} type="button">
                      Add to cart
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
