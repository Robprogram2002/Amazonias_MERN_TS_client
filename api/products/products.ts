import { IProduct } from 'types/Product';
import axios from 'axios';
import { IFilterContext } from '@context/FilterContext';

interface BaseProduct {
  title: string;
  slug: string | null;
  type: string;
  description: any;
  specifications: any[];
  features: string[];
  departmentId: string;
  categoryId: string;
  subs: string[];
  vendor: string;
  brand: string;
  details: string;
}

interface ProductPayload extends BaseProduct {
  basePrice: number;
  currency: string;
  sku: string;
  stock: number;
  images: {
    publicId: string;
    url: string;
  }[];
  availability: string;
  state: string;
  condition: string;
}

export interface Variant {
  basePrice: number;
  currency: string;
  sku: string;
  stock: number;
  images: {
    publicId: string;
    url: string;
  }[];
  availability: string;
  state: string;
  condition: string;
  options: string[];
}

interface ProductVariantPayload extends BaseProduct {
  productVariants: Variant[];
  variants: {
    name: string;
    options: string[];
  }[];
}

export const fetchProducts = () => axios.get('/products/list');

export const fetchOneProduct = (slug: string | string[]) =>
  axios.get(`/products/list/${slug}`);

export const filterProducts = (
  text: string,
  department: string,
  category: string,
  subcategory: string
) =>
  axios.post('/products/admin/filter', {
    text,
    department,
    category,
    subcategory,
  });

export const fetchHomeProducts = async () => {
  const { data } = await axios.get<{
    recentProducts: IProduct[];
    mostSoldProducts: IProduct[];
    onSaleProducts: IProduct[];
    mostRatingProducts: IProduct[];
  }>('/products/home');
  return data;
};

export const fetchStoreProducts = async (filters: IFilterContext) => {
  const requestData = {
    department: filters.department?._id || '',
    category: filters.category?._id || '',
    sub: filters.sub?._id || '',
    price: filters.price || null,
    brand: filters.brand || null,
    rating: filters.rating || null,
    vendor: filters.vendor || null,
    condition: filters.condition || null,
    sort: filters.sort,
  };

  const { data } = await axios.post<IProduct[]>('/products/store', {
    ...requestData,
  });
  return data;
};

export const fetchPageProduct = async (slug: string) => {
  const { data } = await axios.get<IProduct>(`/products/page/${slug}`);
  return data;
};

export const addProduct = (data: ProductPayload) =>
  axios.post('/products/create', { ...data });

export const addProductVariants = (data: ProductVariantPayload) =>
  axios.post('/products/create-variants', { ...data });

export const updateProduct = (data: ProductPayload) =>
  axios.patch(`/products/update/${data.slug}`, { ...data });

export const removeProduct = (id: string) =>
  axios.delete(`/products/delete/${id}`);

// export const filterByText = (text: string, departmentId: string) =>
//   axios.get('/categories/filter/by-text', {
//     params: { text, department: departmentId },
//   });

// export const filterByDepartment = (departmentId: string) =>
//   axios.get(`/categories/list/by-department/${departmentId}`);
