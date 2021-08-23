import { useContext, useState } from 'react';
import { Rate, Select } from 'antd';
import { IProduct } from 'types/Product';
import { useMutation } from 'react-query';
import { addPrductToCart } from '@api/cart';
import { authContext } from '@context/AuthContext';
import { appContext } from '@context/AppContext';
import { cartContext } from '@context/CartContext';
import styles from './Header.module.scss';

const { Option } = Select;

const range = (min: number, max: number) => {
  const arr = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  return arr;
};

const Header = ({ product }: { product: IProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const { authenticated } = useContext(authContext);
  const { addProductCart, editProductCart } = useContext(cartContext);
  const { setDrawer } = useContext(appContext);
  const [selectedImage, setSelectImage] = useState<string>(
    product.images[0].url || ''
  );

  const mutation = useMutation('add-product-to-cart', addPrductToCart, {
    onSuccess: ({ data, status }) => {
      if (status === 200) {
        if (data.status === 'new') {
          addProductCart({ ...data, authenticated: true });
        } else {
          editProductCart({ ...data });
        }

        setDrawer(true);
        setQuantity(1);
      }
    },
  });

  const addToCart = () => {
    if (!authenticated) {
      addProductCart({
        authenticated: false,
        product,
        quantity,
        totalAmount: 0,
      });

      setDrawer(true);
      setQuantity(1);
    } else {
      mutation.mutate({
        price: product.basePrice,
        quantity,
        productId: product._id,
      });
    }
  };

  return (
    <>
      <div className={styles.HeadContainer}>
        <div className={styles.Galery}>
          <div className={styles.ImageColumn}>
            {product.images.map((img) => (
              <img
                src={img.url}
                alt="a askn jkqn wjek"
                key={img.publicId}
                onMouseEnter={() => setSelectImage(img.url)}
                className={selectedImage === img.url ? styles.Active : ''}
              />
            ))}
          </div>
          <div className={styles.MainImage}>
            <img src={selectedImage} alt="a askn jkqn wjek" />
          </div>
        </div>
        <div className={styles.ProductInfo}>
          <div className={styles.Data}>
            <h1> {product.title} </h1>
            <span
              className={styles.TextLink}
            >{`Visit the ${product.vendor.name} page`}</span>
            <div className={styles.Rating}>
              <Rate
                value={product.averageRate || 4}
                disabled
                allowHalf
                className={styles.Stars}
              />
              <span
                className={styles.TextLink}
              >{`${product.rateCount}  ratings`}</span>
            </div>
            <span className={styles.TextLink}> 227 answered questions </span>
            <hr />
            <div className={styles.Specifications}>
              {product.specifications.map(({ name, value }) => (
                <div className={styles.SpecificationRow} key={name}>
                  <strong> {name} </strong>
                  <span> {value} </span>
                </div>
              ))}
            </div>

            <hr />

            <div className={styles.Features}>
              <h3>About this item</h3>
              <ul>
                {product.features.map((feature) => (
                  <li key={feature}> {feature} </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.SideCard}>
            <h3>{`$ ${product.basePrice} ${product.currency}`}</h3>{' '}
            <strong style={{ margin: '6px 0px' }}> Arrives: Oct 5 - 17 </strong>
            <span className={styles.ProductAvailability}>
              {product.availability}
            </span>
            <div style={{ margin: '0.5rem 0rem' }}>
              <span>Quantity : </span>
              <Select
                style={{ width: 60 }}
                value={quantity}
                onChange={(e) => setQuantity(+e)}
              >
                {range(1, product.stock - 1).map((integer) => (
                  <Option value={integer} key={integer}>
                    {' '}
                    {integer}{' '}
                  </Option>
                ))}
              </Select>
            </div>
            <button
              type="button"
              className={styles.CartButton}
              onClick={addToCart}
            >
              {mutation.isLoading ? 'Loading ...' : 'Add to Cart'}
            </button>
            <button type="button" className={styles.BuyButton}>
              Buy Now
            </button>
            <div style={{ margin: '1rem 0rem' }}>
              <span>Secure transaction</span>
            </div>
            <div className={styles.Details}>
              <span>Ships from </span>
              <p>Amazonias</p>
              <span>Sold By </span>
              <p> {product.vendor.name} </p>
              <span> Packaging </span>
              <p>Somehting Inside</p>
            </div>
            <div>
              <hr />
            </div>
            <button type="button" className={styles.WhishListButton}>
              Add to Whish List
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
