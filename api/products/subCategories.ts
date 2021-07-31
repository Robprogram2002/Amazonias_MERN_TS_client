import axios from 'axios';

interface SubCategoryPayload {
  name: string;
  categoryId: string;
  slug: string | null;
}

export const fetchSubCategories = () => axios.get('/sub-categories/list');

export const fetchOneSubCategory = (slug: string) =>
  axios.get(`/sub-categories/list/${slug}`);

export const addSubCategory = (data: SubCategoryPayload) =>
  axios.post('/sub-categories/create', { ...data });

export const updateSubCategory = (data: SubCategoryPayload) =>
  axios.patch(`/sub-categories/update/${data.slug}`, { ...data });

export const removeSubCategory = (slug: string) =>
  axios.delete(`/sub-categories/delete/${slug}`);

export const filterByText = (text: string, categoryId: string) =>
  axios.get('/sub-categories/filter/by-text', {
    params: { text, category: categoryId },
  });

export const filterByDepartment = (categoryId: string) =>
  axios.get(`/sub-categories/list/by-category/${categoryId}`);
