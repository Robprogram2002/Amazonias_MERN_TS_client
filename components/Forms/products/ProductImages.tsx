import Column from '@components/Layout/Containers/Column';
import { Dispatch, SetStateAction } from 'react';
import ImageUpload from '../Fields/ImageUpload';

const ProductImages = ({
  menuKey,
  images,
  setImages,
}: {
  menuKey: string;
  images: { publicId: string; url: string }[];
  setImages: Dispatch<SetStateAction<{ publicId: string; url: string }[]>>;
}) => {
  if (menuKey === 'images') {
    return (
      <Column>
        <ImageUpload
          label="Product Images"
          handler={setImages}
          images={images}
        />
      </Column>
    );
  }

  return <div style={{ display: 'none' }} />;
};

export default ProductImages;
