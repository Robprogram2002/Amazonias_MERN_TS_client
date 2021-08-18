import { LoadingOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { useMutation } from 'react-query';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { removeImage, uploadImage } from '../../../api/products/uploadFiles';
import styles from './InputField.module.scss';

interface Props {
  label: string;
  images: { publicId: string; url: string }[];
  handler: Dispatch<SetStateAction<{ publicId: string; url: string }[]>>;
}

const ImageUpload: FC<Props> = ({ label, images, handler }) => {
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
    <div>
      {label !== '' && <h3 className={styles.Label}>{label}</h3>}
      <label htmlFor="image">
        <div className={styles.FileLabel}>
          <BsCloudUpload size={20} style={{ marginRight: '6px' }} />
          <span>Upload File</span>
        </div>
      </label>
      <input
        type="file"
        name="image"
        id="image"
        multiple
        hidden
        accept="images/*"
        className={styles.InputFile}
        onChange={changeHandler}
      />

      <div className={styles.ImageRow}>
        {images.length > 0 ? (
          images.map((image: any) => (
            <button
              type="button"
              onClick={() => removeHandler(image.publicId)}
              key={image.public_id}
            >
              <Badge count="X" style={{ cursor: 'pointer' }}>
                <Avatar src={image.url} size={80} shape="square" />
              </Badge>
            </button>
          ))
        ) : (
          // ) : (
          //   <>
          //     <Avatar size={80} shape="square" icon={<UserOutlined />} />
          //     <Avatar size={80} shape="square" icon={<UserOutlined />} />
          //     <Avatar size={80} shape="square" icon={<UserOutlined />} />
          //     <Avatar size={80} shape="square" icon={<UserOutlined />} />
          //   </>
          <div style={{ height: '80px' }} />
        )}

        {uploadMutation.isLoading && <LoadingOutlined />}
      </div>
    </div>
  );
};

export default ImageUpload;
