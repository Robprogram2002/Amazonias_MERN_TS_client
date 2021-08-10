import axios from 'axios';
import { IBrand } from '../../types/Brand';

interface BrandPayload {
  name: string;
  slug: string | null;
  logo: {
    publicId: string;
    url: string;
  };
}

export const fetchtBrands = async () => {
  const { data } = await axios.get<IBrand[]>('/brands/list');
  return data;
};

export const fetchBrand = async (slug: string | string[]) => {
  const { data } = await axios.get<IBrand>(`/brands/list/${slug}`);
  return data;
};

export const addBrand = (payload: BrandPayload) =>
  axios.post<IBrand>('/brands/create', { ...payload });

export const updateBrand = (payload: BrandPayload) =>
  axios.patch(`/brands/update/${payload.slug}`, {
    ...payload,
  });

export const removeBrand = async (id: string) => {
  const { data } = await axios.delete(`/brands/delete/${id}`);
  return data;
};

export const filterByText = (text: string | null) =>
  axios.get<IBrand[]>('/brands/filter/by-text', {
    params: { text },
  });
