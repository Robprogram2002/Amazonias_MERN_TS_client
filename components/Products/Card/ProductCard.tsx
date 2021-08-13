import { Rate } from 'antd';
import { useRouter } from 'next/router';
import { IProduct } from 'types/Product';
import styles from './ProductCard.module.scss';

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/store/${product.slug}`);
  };

  const title =
    product.title.length > 65
      ? `${product.title.substring(0, 65)} ...`
      : product.title;

  return (
    <div className={styles.Card}>
      <img src={product.images[0].url} alt=" asjdkaj sd" />
      <div className={styles.CardContent}>
        <div
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          role="menuitem"
          tabIndex={0}
        >
          <h3>{title}</h3>
        </div>
        <div className={styles.Rate}>
          <Rate
            disabled
            allowHalf
            value={product.averageRate || 5}
            className={styles.Stars}
          />
          <span className={styles.Rating}> {product.rateCount} </span>
        </div>

        <span className={styles.Price}>
          {`${product.basePrice}  ${product.currency}`}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
