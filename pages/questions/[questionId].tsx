import { FormEvent, useState, useContext } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { addQuestionAnswer, fetchQuestion } from '@api/questions';
import Center from '@components/Layout/Containers/Center';
import fireAuthNotification from '@components/UI/Notifications/AuthNotification';
import { authContext } from '@context/AuthContext';
import { Upload } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import styles from './index.module.scss';

const AnswerForm = ({
  refetch,
  questionId,
}: {
  refetch: any;
  questionId: string;
}) => {
  const [content, setContent] = useState('');
  const { authenticated } = useContext(authContext);
  const router = useRouter();

  const mutation = useMutation('add-answer-to-Question', addQuestionAnswer, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        setContent('');
        refetch();
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!authenticated) {
      fireAuthNotification(router);
    } else {
      mutation.mutate({ content, questionId });
    }
  };

  return (
    <>
      <strong>Add a video answer</strong>
      <span className={styles.DateText}>
        Shoppers find videos more helpful than text alone.
      </span>
      <Upload
        name="answer-video"
        listType="picture-card"
        className={styles.UploadVideo}
        showUploadList={false}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // beforeUpload={beforeUpload}
        // onChange={this.handleChange}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
      <strong>Add a written answer</strong>
      <TextArea
        className={styles.TextArea}
        placeholder="Type your answer here ..."
        autoSize={{ minRows: 4, maxRows: 6 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className={styles.SubmitButton}
        type="submit"
        disabled={content === '' || content.length <= 3}
        onClick={submitHandler}
      >
        {mutation.isLoading ? 'Loading ...' : 'Answer'}
      </button>
    </>
  );
};

const QuestionPage = () => {
  const router = useRouter();
  const questionId = router.query.questionId as string;

  const { isLoading, data, error, refetch } = useQuery(
    ['fetch-question', questionId],
    () => fetchQuestion(questionId)
  );

  const productRedirect = () => router.push(`/store/${data!.product.slug}`);
  const questionRedirect = () =>
    router.push(`/store/${data!.product.slug}/questions`);

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
      <div className={styles.Grid}>
        <div
          className={styles.ProductInfo}
          onClick={productRedirect}
          onKeyDown={productRedirect}
          role="link"
          tabIndex={0}
        >
          <img src={data!.product.images[0].url} alt="askd klajsd sl" />
          <h4 className={styles.TextLink}> {data!.product.title} </h4>
        </div>
        <div className={styles.Form}>
          <h2> {data!.question} </h2>
          <span className={styles.DateText}>
            {`asked on ${data!.createdAt}`}
          </span>
          <div style={{ height: '10px' }} />
          <AnswerForm refetch={refetch} questionId={data!._id} />
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h3
            className={styles.TextLink}
            onClick={questionRedirect}
            onKeyDown={questionRedirect}
          >
            See all questions about this product
          </h3>
        </div>
      </div>
      <div className={styles.AnswerList}>
        {data!.answers.length > 0 ? (
          data!.answers.map(({ content, createdAt, user }) => (
            <div className={styles.AnswerCard}>
              <p> {content} </p>
              <div className={styles.User}>
                <Avatar src={user.profileImage} />
                <span> {user.username} </span>
                <span className={styles.DateText}>{createdAt}</span>
              </div>
              <div className={styles.Usefuls}>
                <p className={styles.Text}>
                  7 of 10 found this helpful. Do you?
                </p>
                <button type="button">Yes</button>
                <button type="button">No</button>
                <span className={styles.TextLink}>Report abuse</span>
              </div>
            </div>
          ))
        ) : (
          <h2>This question does not have responses yet</h2>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
