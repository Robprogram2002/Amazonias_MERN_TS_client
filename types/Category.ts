export interface ICategory {
  _id: string;
  name: string;
  banners: { publicId: string; url: string }[];
  slug: string;
  departmentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
