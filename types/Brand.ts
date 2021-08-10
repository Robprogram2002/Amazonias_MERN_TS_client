export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  logo: { publicId: string; url: string };
  createdAt: Date;
  updatedAt: Date;
}
