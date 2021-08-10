import { ISubCategory } from './SubCategory';

export interface ICategory {
  _id: string;
  name: string;
  banners: { publicId: string; url: string }[];
  slug: string;
  department: any | null;
  departmentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategorySubs extends ICategory {
  subs: ISubCategory[];
}
