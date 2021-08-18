import { LoadingOutlined } from '@ant-design/icons';
import Center from '@components/Layout/Containers/Center';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchOneComment } from '@api/comments';
// import styles from './index.module.scss';

const ReviewPage = () => {
  const router = useRouter();
  const reviewId = router.query.reviewId as string;

  const { isLoading, data, error } = useQuery(['fetch-review', reviewId], () =>
    fetchOneComment(reviewId)
  );

  //   const productRedirect = () => router.push(`/store/${data!.product.slug}`);
  //   const reviewsRedirect = () =>
  // router.push(`/store/${data!.product.slug}/reviews`);

  if (isLoading) {
    return (
      <Center>
        <LoadingOutlined />
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <h3>Upps ... something went wrong , plase try again</h3>
      </Center>
    );
  }

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <h1>maskdkasmdkl</h1>
      <p> {JSON.stringify(data)} </p>
    </div>
  );
};

export default ReviewPage;
