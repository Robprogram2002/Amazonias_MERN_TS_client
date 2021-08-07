import axios from 'axios';

export const uploadImage = ({
  uri,
  imageName,
}: {
  uri: any;
  imageName: string;
}) =>
  axios.post('/images/upload', {
    image: uri,
    imageName,
  });

export const removeImage = (publicId: string) =>
  axios.delete(`/images/remove/${publicId}`);
