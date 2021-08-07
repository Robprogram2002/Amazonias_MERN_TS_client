import { LoadingOutlined } from '@ant-design/icons';
import Resizer from 'react-image-file-resizer';
import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { FormEvent } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { useMutation } from 'react-query';
import onErrorHandler from 'api/authentication/onErrorHandler';
import { useFormikContext } from 'formik';
import { Variant } from '@api/products/products';
import { removeImage, uploadImage } from '../../../api/products/uploadFiles';
import styles from './InputField.module.scss';

const ImageUploadVariant = ({
  label,
  index,
}: {
  label: string;
  index: number;
}) => {
  const {
    values: { productVariants },
    setFieldValue,
  } = useFormikContext<{
    productVariants: Variant[];
  }>();
  const uploadMutation = useMutation('upload-file', uploadImage, {
    onSuccess: (response) => {
      if (response.status === 200) {
        const newArray = [...productVariants];
        if (newArray[index].images) {
          newArray[index].images.push(response.data);
        } else {
          newArray[index].images = [response.data];
        }
        setFieldValue('productVariants', newArray);
      }
    },
    onError: (error) => {
      onErrorHandler(error);
    },
  });

  const removeMutation = useMutation('remove-file', removeImage, {
    onSuccess: (response) => {
      console.log(response);
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
      <h3 className={styles.Label}>{label}</h3>
      <label htmlFor={`image-${index}`}>
        <div className={styles.FileLabel}>
          <BsCloudUpload size={20} style={{ marginRight: '6px' }} />
          <span>Upload File</span>
        </div>
      </label>
      <input
        type="file"
        name="image"
        id={`image-${index}`}
        multiple
        hidden
        accept="images/*"
        className={styles.InputFile}
        onChange={changeHandler}
      />

      <div className={styles.ImageRow}>
        {productVariants[index] &&
          productVariants[index].images &&
          productVariants[index].images.map((image: any) => (
            <button
              type="button"
              onClick={() => removeHandler(image.publicId)}
              key={image.public_id}
            >
              <Badge count="X" style={{ cursor: 'pointer' }}>
                <Avatar src={image.url} size={80} shape="square" />
              </Badge>
            </button>
          ))}

        {uploadMutation.isLoading && <LoadingOutlined />}
      </div>
    </div>
  );
};

export default ImageUploadVariant;
