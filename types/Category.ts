export interface ICategory {
  name: string;
  banners: { publicId: string; url: string }[];
  slug: string;
  departmentId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
