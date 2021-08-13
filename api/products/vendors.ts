import axios from 'axios';
import { ISubCategory } from 'types/SubCategory';
import { ICategory } from 'types/Category';
import { IDepartment } from 'types/Department';
import { IVendor, VendorWithProducts } from '../../types/Vendor';

interface AddVendorPayload {
  name: string;
  slug: string | null;
  image: { publicId: string; url: string };
  contact: {
    person: string;
    email: string;
    phone: string;
  };
  location: {
    country: string;
    state: string;
    address: string;
    postalCode: string;
  };
  description: string;
  socials: {
    facebook: string | null;
    website: string | null;
    twetter: string | null;
  };
}

export const fetchtVendors = async () => {
  const { data } = await axios.get<IVendor[]>('/vendors/list');
  return data;
};

export const fetchVendorWithProducts = async (slug: string | string[]) => {
  const { data } = await axios.get<VendorWithProducts>(
    `/vendors/list/${slug}/with-products`
  );
  return data;
};

export const fetchVendor = async (slug: string | string[]) => {
  const { data } = await axios.get<IVendor>(`/vendors/list/${slug}`);
  return data;
};

export const fetchFeaturedVendors = async (
  department: IDepartment | null,
  category: ICategory | null,
  sub: ISubCategory | null
) => {
  const requestParams = {
    department: department?._id,
    category: category?._id || null,
    sub: sub?._id || null,
  };

  const { data } = await axios.get<IVendor[]>('/vendors/featured', {
    params: requestParams,
  });

  return data;
};

export const addVendor = (payload: AddVendorPayload) =>
  axios.post<IVendor>('/vendors/create', { ...payload });

export const updateVendor = (payload: AddVendorPayload) =>
  axios.patch(`/vendors/update/${payload.slug}`, {
    ...payload,
  });

export const removeBrand = async (id: string) => {
  const { data } = await axios.delete(`/vendors/delete/${id}`);
  return data;
};

export const filterByText = (text: string | null) =>
  axios.get<IVendor[]>('/vendors/filter/by-text', {
    params: { text },
  });
