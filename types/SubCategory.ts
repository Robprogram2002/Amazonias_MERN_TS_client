export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: any | null;
  createdAt: Date;
  updatedAt: Date;
}
