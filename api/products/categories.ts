import axios from 'axios';

interface CategoryPayload {
  name: string;
  description: string;
  departmentId: string;
  banners: { publicId: string; url: string }[];
  slug: string | null;
}

export const fetchCategories = () => axios.get('/categories/list');

export const fetchOneCategory = (slug: string | string[]) =>
  axios.get(`/categories/list/${slug}`);

export const fetchCategoriesByDepartment = (departmentId: string) =>
  axios.get(`/categories/list/by-department/${departmentId}`);

export const addCategory = (data: CategoryPayload) =>
  axios.post('/categories/create', { ...data });

export const updateCategory = (data: CategoryPayload) =>
  axios.patch(`/categories/update/${data.slug}`, { ...data });

export const removeCategory = (id: string) =>
  axios.delete(`/categories/delete/${id}`);

export const filterByText = (text: string, departmentId: string) =>
  axios.get('/categories/filter/by-text', {
    params: { text, department: departmentId },
  });

export const filterByDepartment = (departmentId: string) =>
  axios.get(`/categories/list/by-department/${departmentId}`);
