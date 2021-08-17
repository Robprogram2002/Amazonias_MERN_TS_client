import { ICategory } from './Category';
import { IDepartment } from './Department';

interface IVariant {
  basePrice: number;
  currency: string;
  sku: string;
  stock: number;
  sold: number;
  images: {
    publicId: string;
    url: string;
  }[];
  sale: {
    onSale: boolean;
    saleAmount: number;
    expiry: Date;
  };
  availability: string;
  state: string;
  condition: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  type: string;
  basePrice: number;
  currency: string;
  description: string;
  sku: string;
  stock: number;
  images: {
    publicId: string;
    url: string;
  }[];
  features: string[];
  specifications: {
    name: string;
    value: string;
  }[];
  sale: {
    onSale: boolean;
    saleAmount: number;
    expiry: Date;
  };
  departmentId: any;
  categoryId: any;
  subs: any[];
  vendor: any;
  availability: string;
  state: string;
  condition: string;
  brand: string;
  details: string;
  variants:
    | {
        name: string;
        options: string[];
      }[]
    | null;
  productVariants: IVariant[] | null;
  ratings: {
    star: number;
    postedBy: any;
  }[];
  rateCount: number;
  averageRate: number;
  department: IDepartment[] | null;
  category: ICategory[] | null;
  createdAt: Date;
  updatedAt: Date;
}
