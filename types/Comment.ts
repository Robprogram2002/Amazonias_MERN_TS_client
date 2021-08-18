import { IProduct } from './Product';

export interface IComment {
  _id: string;
  customer: {
    userId: string;
    username: string;
    photoUrl: string;
  };
  title: string;
  rate: number;
  content: string;
  origin: string;
  likes: string[];
  userVote: boolean | undefined;
  images: { publicId: string; url: string }[];
  buyVeridied: boolean;
  productId: string;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
