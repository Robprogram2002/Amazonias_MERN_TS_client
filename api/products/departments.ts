import axios from 'axios';

interface DepartmentPayload {
  name: string;
  description: string;
  banners: { publicId: string; url: string }[];
  slug: string | null;
}

export const fetchDepartments = () => axios.get('/departments/list');

export const fetchOneDepartment = (slug: string) =>
  axios.get(`/departments/list/${slug}`);

export const addDepartment = (data: DepartmentPayload) =>
  axios.post('/departments/create', { ...data });

export const updateDepartment = (data: DepartmentPayload) =>
  axios.patch(`/departments/update/${data.slug}`, { ...data });

export const removeDepartment = (slug: string) =>
  axios.delete(`/departments/delete/${slug}`);

export const filterByText = (text: string | null) => {
  if (text) {
    return axios.get('/departments/filter/by-text', {
      params: { text },
    });
  }
  return axios.get('/departments/filter/by-text');
};
