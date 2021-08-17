import { useContext, useState } from 'react';
import { fetchOneProduct } from '@api/products/products';
import fireAuthNotification from '@components/UI/Notifications/AuthNotification';
import { fetchProductQuestions, addQuestionVote } from '@api/questions';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { authContext } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { FiSearch } from 'react-icons/fi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { useQuery, useMutation } from 'react-query';
import styles from '../store.module.scss';

const ProductQuestionsPage = () => {
  const { user, authenticated } = useContext(authContext);
  const [text, setText] = useState('');
  const router = useRouter();
  const slug = router.query.productSlug as string;

  const product = useQuery(
    ['fetch-product', slug],
    () => fetchOneProduct(slug),
    {
      enabled: !!slug,
    }
  );

  const questions = useQuery(
    ['fetch-product-questions', slug, text],
    () => fetchProductQuestions(slug, user?._id || null, text),
    {
      enabled: !!slug,
    }
  );

  const mutation = useMutation('vote-question', addQuestionVote, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        questions.refetch();
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const redirectToQuestion = (questionId: string) => {
    router.push(`/questions/${questionId}`);
  };

  const voteHandler = (value: number, questionId: string) => {
    if (authenticated) {
      mutation.mutate({ value, questionId });
    } else {
      fireAuthNotification(router);
    }
  };

  return (
    <div className={styles.Container}>
      {product.data && (
        <div className={styles.ProductInfo}>
          <img src={product.data.images[0].url} alt="mlkda dsa d" />
          <div>
            <h2 className={styles.TextLink}> {product.data.title} </h2>
            <span> {`By ${product.data.brand}`} </span>
          </div>
        </div>
      )}
      <h1>Customer Questions & Answers</h1>
      <Input
        className={styles.FilterInput}
        prefix={<FiSearch />}
        placeholder="Have a question? Search fore answers"
        size="middle"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.Filters}>
        <span>Showing 1-10 of 1000+ questions</span>
        <div>
          <strong>Sort by </strong>
        </div>
      </div>
      <div className={styles.QuestionList}>
        {questions.data &&
          questions.data.map(
            ({ averageVote, question, answers, _id, userVote }) => (
              <div className={styles.QuestionCard} key={_id}>
                <div className={styles.Votes}>
                  <RiArrowUpSFill
                    size={40}
                    className={
                      userVote && userVote === 1
                        ? `${styles.ArrowIcon} ${styles.Voted}`
                        : styles.ArrowIcon
                    }
                    onClick={() => voteHandler(1, _id)}
                  />
                  <span> {averageVote} Votes </span>
                  <RiArrowDownSFill
                    size={40}
                    className={
                      userVote && userVote === -1
                        ? `${styles.ArrowIcon} ${styles.Voted}`
                        : styles.ArrowIcon
                    }
                    onClick={() => voteHandler(-1, _id)}
                  />
                </div>
                <div className={styles.QuestionContainer}>
                  <div className={styles.Question}>
                    <strong>Question :</strong>
                    <span
                      className={styles.TextLink}
                      onClick={() => redirectToQuestion(_id)}
                      onKeyDown={() => redirectToQuestion(_id)}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {question}
                    </span>
                  </div>
                  <div className={styles.AnswerGrid}>
                    <strong>Answer :</strong>
                    {answers.length > 0 ? (
                      <div>
                        <div className={styles.Answer}>
                          <span>{answers[0].content}</span>
                          <span className={styles.From}>
                            By {answers[0].user.username} on{' '}
                            {answers[0].createdAt}
                          </span>
                        </div>
                        {answers.length > 1 && (
                          <span
                            onClick={() => redirectToQuestion(_id)}
                            onKeyDown={() => redirectToQuestion(_id)}
                            role="menuitem"
                            tabIndex={0}
                            className={styles.TextLink}
                            style={{ textDecoration: 'underline' }}
                          >{`See all answers (${answers.length - 1})`}</span>
                        )}
                      </div>
                    ) : (
                      <span> (This question does not have responses yet) </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ProductQuestionsPage;
