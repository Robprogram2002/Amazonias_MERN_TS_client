import axios from 'axios';

export const fetchDepartments = () => axios.get('/departments/list');

export const removeImage = (publicId: string) =>
  axios.delete(`/images/remove/${publicId}`);
