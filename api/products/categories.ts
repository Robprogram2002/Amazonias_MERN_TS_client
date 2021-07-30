import axios from 'axios';

export const fetchCategories = () => axios.get('/categories/list');

export const removeImage = (publicId: string) =>
  axios.delete(`/images/remove/${publicId}`);
