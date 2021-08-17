import CreateQuestionForm from '@components/Forms/questions/CreateQuestionForm';
import fireAuthNotification from '@components/UI/Notifications/AuthNotification';
import { authContext } from '@context/AuthContext';
import { Input } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { FiSearch } from 'react-icons/fi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { fetchProductQuestions } from '@api/questions';
import styles from './Questions.module.scss';

const defaultQuestions = 4;

const Questions = ({
  productId,
  productSlug,
}: {
  productId: string;
  productSlug: string;
}) => {
  const { authenticated, user } = useContext(authContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState('');
  const router = useRouter();

  const { data, refetch } = useQuery(
    ['fetch-product-questions', productSlug, text],
    () => fetchProductQuestions(productSlug, user?._id || null, text),
    {
      enabled: !!productSlug,
    }
  );

  const popupHandler = () => {
    if (authenticated) {
      setIsOpen(true);
    } else {
      fireAuthNotification(router);
    }
  };

  const redirectToQuestion = (questionId: string) => {
    router.push(`/questions/${questionId}`);
  };

  const questionRedirect = () => router.push(`/store/${productSlug}/questions`);

  return (
    <>
      <h2>Customer questions & answers</h2>
      {isOpen && (
        <CreateQuestionForm
          refetch={refetch}
          productId={productId}
          setIsOpen={setIsOpen}
        />
      )}
      <div className={styles.QAContainer}>
        <div className={styles.Options}>
          <span
            className={styles.TextLink}
            onClick={questionRedirect}
            onKeyDown={questionRedirect}
            role="link"
            tabIndex={0}
          >
            See all questions about this product
          </span>
          <span
            className={styles.TextLink}
            onClick={popupHandler}
            onKeyDown={popupHandler}
            role="menuitem"
            tabIndex={0}
          >
            Make a question
          </span>
        </div>
        <Input
          prefix={<FiSearch />}
          placeholder="Have a question? Search fore answers"
          size="middle"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {data &&
          data
            .slice(0, defaultQuestions)
            .map(({ averageVote, question, answers, _id, userVote }) => (
              <div className={styles.QuestionCard} key={_id}>
                <div className={styles.Votes}>
                  <RiArrowUpSFill
                    size={40}
                    className={
                      userVote && userVote === 1
                        ? `${styles.ArrowIcon} ${styles.Voted}`
                        : styles.ArrowIcon
                    }
                    // onClick={() => voteHandler(1, _id)}
                  />
                  <span> {averageVote} Votes </span>
                  <RiArrowDownSFill
                    size={40}
                    className={
                      userVote && userVote === -1
                        ? `${styles.ArrowIcon} ${styles.Voted}`
                        : styles.ArrowIcon
                    }
                    // onClick={() => voteHandler(-1, _id)}
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
                            className={styles.TextLink}
                            style={{ textDecoration: 'underline' }}
                          >{`See more answers (${answers.length - 1})`}</span>
                        )}
                      </div>
                    ) : (
                      <span> (This question does not have responses yet) </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

        <div style={{ height: '20px' }} />
        {data && data.length > defaultQuestions && (
          <>
            <div className={styles.ButtonContainer}>
              <button type="button" className={styles.MoreButton}>
                {`See more answered questions (${
                  data.length - defaultQuestions
                })`}
              </button>
            </div>
            <div style={{ height: '20px' }} />
          </>
        )}
      </div>
    </>
  );
};

export default Questions;
