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
