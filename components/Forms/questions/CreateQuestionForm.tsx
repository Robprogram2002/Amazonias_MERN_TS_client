import onErrorHandler from '@api/authentication/onErrorHandler';
import { addQuestion } from '@api/questions';
import { Dispatch, SetStateAction, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { IoMdClose } from 'react-icons/io';
import { useMutation } from 'react-query';
import styles from './CreateQuestionForm.module.scss';

const CreateQuestionForm = ({
  setIsOpen,
  productId,
  refetch,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  refetch: any;
}) => {
  const [content, setContent] = useState('');

  const mutation = useMutation('add-question', addQuestion, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        refetch();
        setIsOpen(false);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const submitHandler = () => {
    mutation.mutate({ question: content, productId });
  };

  return (
    <div className={styles.Background}>
      <div className={styles.InputContainer}>
        <div className={styles.Header}>
          <h2>Post your question</h2>
          <div
            className={styles.CloseIcon}
            onClick={() => setIsOpen(false)}
            onKeyDown={() => setIsOpen(false)}
            role="menuitem"
            tabIndex={0}
          >
            <IoMdClose size={20} />
          </div>
        </div>
        <div className={styles.Content}>
          <TextArea
            className={styles.TextArea}
            placeholder="Please enter a question"
            autoSize={{ minRows: 3, maxRows: 5 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p>
            Your question might be answered by sellers, manufacturers, or
            customers who bought this product.
          </p>
          <div className={styles.Buttons}>
            <button
              type="button"
              className={styles.Cancel}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.Post}
              // disabled={content !== '' && content.length > 4}
              onClick={submitHandler}
            >
              Public
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionForm;
