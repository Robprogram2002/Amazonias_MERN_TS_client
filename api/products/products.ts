import axios from 'axios';

interface ProductPayload {
  title: string;
  slug: string | null;
  type: string;
  basePrice: number;
  currency: string;
  description: any;
  sku: string;
  stock: number;
  specifications: any[];
  images: {
    publicId: string;
    url: string;
  }[];
  features: string[];
  departmentId: string;
  categoryId: string;
  subs: string[];
  availability: string;
  state: string;
  condition: string;
  brand: string;
  details: string;
}

export const fetchProducts = () => axios.get('/products/list');

export const fetchOneProduct = (slug: string | string[]) =>
  axios.get(`/products/list/${slug}`);

export const addProduct = (data: ProductPayload) =>
  axios.post('/products/create', { ...data });

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
