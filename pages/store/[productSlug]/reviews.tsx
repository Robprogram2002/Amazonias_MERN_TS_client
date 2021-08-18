// import { useContext, useState } from 'react';
import { fetchOneProduct } from '@api/products/products';
// import onErrorHandler from '@api/authentication/onErrorHandler';
// import { authContext } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
// import styles from '../store.module.scss';

const ProductReviewsPage = () => {
  // const { user } = useContext(authContext);
  // const [text] = useState('');
  const router = useRouter();
  const slug = router.query.productSlug as string;

  const product = useQuery(
    ['fetch-product', slug],
    () => fetchOneProduct(slug),
    {
      enabled: !!slug,
    }
  );

  // const comments = useQuery(
  //   ['fetch-product-reviews', slug, text],
  //   () => fetchProductComments(slug, user?._id || null, text),
  //   {
  //     enabled: !!slug,
  //   }
  // );

  // const mutation = useMutation('like-review', addCommentLike, {
  //   onSuccess: ({ status }) => {
  //     if (status === 200) {
  //       comments.refetch();
  //     }
  //   },
  //   onError: (error) => {
  //     onErrorHandler(error);
  //   },
  // });

  // const redirectToReview = (commentId: string) => {
  //   router.push(`/customer-reviews/${commentId}`);
  // };

  // const likeHandler = (commentId: string) => {
  //   if (authenticated) {
  //     mutation.mutate(commentId);
  //   } else {
  //     fireAuthNotification(router);
  //   }
  // };

  return (
    <div>
      <h1>basnjdbhs</h1>
      <p> {JSON.stringify(product)} </p>
    </div>
  );
};

export default ProductReviewsPage;
