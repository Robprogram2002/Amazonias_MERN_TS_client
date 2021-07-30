import axios from 'axios';

export const uploadImage = (uri: any) =>
  axios.post('/images/upload', {
    image: uri,
  });

export const removeImage = (publicId: string) =>
  axios.delete(`/images/remove/${publicId}`);
