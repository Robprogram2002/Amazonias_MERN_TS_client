import {
  DeleteFilled,
  EyeFilled,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import onErrorHandler from 'api/authentication/onErrorHandler';
import Modal from 'antd/lib/modal/Modal';
import { removeImage, uploadImage } from '../../../api/products/uploadFiles';
import styles from './FileUpload.module.scss';

interface Props {
  images: { publicId: string; url: string }[];
  handler: Dispatch<SetStateAction<{ publicId: string; url: string }[]>>;
  limit: number;
}

const ImageUpload: FC<Props> = ({ images, handler, limit }) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const uploadMutation = useMutation('upload-file', uploadImage, {
    onSuccess: (response) => {
      if (response.status === 200) {
        handler((prevState) => prevState.concat(response.data));
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const removeMutation = useMutation('remove-file', removeImage, {
    onSuccess: (response) => {
      handler((prevState) =>
        prevState.filter(
          (elment: any) => elment.publicId !== response.data.publicId
        )
      );
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as typeof e.target & {
      files: any[];
    };
    const { files } = target;

    if (files) {
      for (let i = 0; i < files.length; i += 1) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            uploadMutation.mutate({ uri, imageName: files[i].name });
          },
          'base64'
        );
      }
    }
  };

  const removeHandler = (id: string) => {
    removeMutation.mutate(id);
  };

  return (
    <div className={styles.Container}>
      <input
        type="file"
        name="image"
        id="image"
        hidden
        className={styles.InputFile}
        onChange={changeHandler}
      />

      <div className={styles.ImagesGrid}>
        {images.map(({ url, publicId }) => (
          <div className={styles.ImageCard} key={publicId}>
            <img src={url} alt="asjdnks" />
            <div className={styles.Options}>
              <EyeFilled size={45} onClick={() => setPreviewUrl(url)} />
              <DeleteFilled size={45} onClick={() => removeHandler(publicId)} />
            </div>
          </div>
        ))}
        {images.length < limit && (
          <label htmlFor="image">
            <div className={styles.FileLabel}>
              {uploadMutation.isLoading ? (
                <>
                  <LoadingOutlined size={30} />
                  <span>Loading ...</span>
                </>
              ) : (
                <>
                  <PlusOutlined size={30} />
                  <span>Upload</span>
                </>
              )}
            </div>
          </label>
        )}
      </div>
      <Modal
        visible={previewUrl !== ''}
        title={null}
        footer={null}
        onCancel={() => setPreviewUrl('')}
      >
        <img alt="example" style={{ width: '100%' }} src={previewUrl} />
      </Modal>
    </div>
  );
};

export default ImageUpload;
