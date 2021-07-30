export interface IDepartment {
  name: string;
  banners: { publicId: string; url: string }[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}
