import { fetchProductComments, fetchProductImageComments } from '@api/comments';
import { authContext } from '@context/AuthContext';
import { IProduct } from 'types/Product';
import { Rate, Progress, Avatar } from 'antd';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import CreateReviewForm from '@components/Forms/revires/CreateReviewForm';
import fireAuthNotification from '@components/UI/Notifications/AuthNotification';
import { useRouter } from 'next/router';
import styles from './Reviews.module.scss';

const defaultComments = 6;

const Reviews = ({
  productSlug,
  productId,
  averageRate,
  ratings,
}: {
  productSlug: string;
  productId: string;
  averageRate: number;
  ratings: IProduct['ratings'];
}) => {
  const { user, authenticated } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data } = useQuery(
    ['fetch-product-reviews', productSlug],
    () => fetchProductComments(productSlug, user?._id || null, ''),
    {
      enabled: !!productSlug,
    }
  );

  const imageReviews = useQuery(
    ['fetch-product-reviews-with-images', productSlug],
    () => fetchProductImageComments(productSlug, user?._id || null)
  );

  const total = ratings.length;

  const getPercentage = (value: number) => {
    const count = ratings.filter(
      (rating) => Math.floor(rating.star) === value
    ).length;
    return Math.round((count / total) * 100);
  };

  const clickHandler = () => {
    if (!authenticated) {
      fireAuthNotification(router);
    } else {
      setIsOpen(true);
    }
  };

  const RateTableRow = ({ rate }: { rate: number }) => (
    <div className={styles.Row}>
      <span> {rate} star</span>
      <Progress
        percent={getPercentage(rate)}
        strokeWidth={22}
        strokeColor="orange"
        strokeLinecap="square"
        showInfo={false}
        className={styles.Progress}
      />
      <span className={styles.Percentage}> {getPercentage(rate)} %</span>
    </div>
  );

  if (!data) {
    return <div />;
  }

  return (
    <>
      {isOpen && (
        <CreateReviewForm productId={productId} setIsOpen={setIsOpen} />
      )}
      <h2>Customer reviews</h2>
      <div className={styles.Container}>
        <div className={styles.Ratings}>
          <div className={styles.Average}>
            <Rate
              disabled
              allowHalf
              value={averageRate}
              className={styles.Stars}
            />
            <span className={styles.RateValue}>
              {`${averageRate.toFixed(1)} out of 5 `}
            </span>
          </div>
          <span className={styles.TotalCount}>
            {ratings.length} global ratings
          </span>
          <div className={styles.RateTable}>
            <RateTableRow rate={5} />
            <RateTableRow rate={4} />
            <RateTableRow rate={3} />
            <RateTableRow rate={2} />
            <RateTableRow rate={1} />
          </div>

          <div className={styles.MakeComment}>
            <h3>Review this product</h3>
            <p>Share your thoughts with other customers</p>
            <button
              className={styles.Button}
              type="button"
              onClick={clickHandler}
            >
              Write a customer review
            </button>
          </div>
        </div>
        <div className={styles.CommentsContainer}>
          <div style={{ width: '80%' }}>
            <h3>Reviews with images</h3>
            {imageReviews.data && imageReviews.data.length > 0 && (
              <>
                <div className={styles.ImagesRow}>
                  {imageReviews.data.slice(0, 4).map(({ images }) => (
                    <img src={images[0].url} alt="asnjdksa d" />
                  ))}
                </div>
                <span className={styles.TextLink}>See all customer images</span>
              </>
            )}

            <h3>Top Reviews</h3>
            <div className={styles.ReviewList}>
              {data
                .slice(0, defaultComments)
                .map(
                  ({
                    customer,
                    _id,
                    createdAt,
                    title,
                    rate,
                    userVote,
                    likes,
                    content,
                  }) => (
                    <div className={styles.CommentCard} key={_id}>
                      <div className={styles.User}>
                        <Avatar
                          className={styles.Avatar}
                          src={customer.photoUrl}
                        />
                        <span> {customer.username} </span>
                      </div>
                      <div className={styles.Head}>
                        <Rate
                          disabled
                          allowHalf
                          value={rate}
                          className={styles.Stars}
                        />
                        <h4>{title}</h4>
                      </div>
                      <span className={styles.GrayText}>
                        Reviewed in the United States on {createdAt}
                      </span>
                      <div className={styles.Content}>{content}</div>
                      <span className={styles.GrayText}>
                        {likes.length} people found this helpful
                      </span>
                      <button
                        className={
                          userVote
                            ? `${styles.VoteButton} ${styles.Liked}`
                            : styles.VoteButton
                        }
                        type="button"
                      >
                        Helpful
                      </button>
                      <span className={styles.AbuseText}>Report abuse</span>
                    </div>
                  )
                )}
            </div>
            {data.length > defaultComments && (
              <span className={styles.TextLink}>
                See all the reviews from this product
                {`(${data.length - defaultComments})`}
              </span>
            )}
          </div>
        </div>
        <div style={{ height: '40px' }} />
      </div>
    </>
  );
};

export default Reviews;
