export interface IDepartment {
  _id: string;
  name: string;
  banners: { publicId: string; url: string }[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
