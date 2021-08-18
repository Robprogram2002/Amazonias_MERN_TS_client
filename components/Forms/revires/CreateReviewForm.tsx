import { Dispatch, SetStateAction, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { IoMdClose } from 'react-icons/io';
import { useMutation } from 'react-query';
import { addComment } from '@api/comments';
import onErrorHandler from '@api/authentication/onErrorHandler';
import { Input, Rate } from 'antd';
import { ImageBanner } from 'types/others';
import styles from './CreateReviewForm.module.scss';
import FileUpload from '../Fields/FileUpload';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const CreateReviewForm = ({
  setIsOpen,
  productId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
}) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [images, setImages] = useState<ImageBanner[]>([]);

  const mutation = useMutation('add-review', addComment, {
    onSuccess: ({ status }) => {
      if (status === 200) {
        setIsOpen(false);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const submitHandler = () => {
    mutation.mutate({
      content,
      title,
      rate: rate!,
      images,
      productId,
      origin: 'United States',
    });
  };

  return (
    <div className={styles.Background}>
      <div className={styles.FormContainer}>
        <div className={styles.Header}>
          <h2>Post your review</h2>
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
          <h3>Overal Rating</h3>
          <Rate
            allowHalf
            tooltips={desc}
            className={styles.Stars}
            value={rate || 0}
            onChange={(e) => setRate(e)}
          />

          <h3> Add a photo or video </h3>
          <span>
            Shoppers find images and videos more helpful than text alone
          </span>
          <FileUpload images={images} handler={setImages} limit={5} />

          <h3>Add a headline</h3>
          <Input
            placeholder="Type here ..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <h3>Write your review</h3>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 6 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type here ..."
          />

          <button
            disabled={content === '' || title === '' || rate === null}
            type="submit"
            className={styles.Submit}
            onClick={submitHandler}
          >
            {mutation.isLoading ? 'Loading ...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReviewForm;
