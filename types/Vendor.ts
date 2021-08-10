import { IProduct } from './Product';

export interface IVendor {
  _id: string;
  name: string;
  slug: string;
  description: string;
  sales: number;
  revenue: number;
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
  socials: {
    facebook: string;
    website: string;
    twetter: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorWithProducts extends IVendor {
  products: IProduct[];
}
