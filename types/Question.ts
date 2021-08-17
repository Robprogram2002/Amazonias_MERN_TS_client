import { IProduct } from './Product';

export interface IQuestion {
  _id: any;
  question: string;
  user: {
    userId: string;
    username: string;
  };
  answers: {
    content: string;
    user: {
      userId: string;
      username: string;
      profileImage: string;
    };
    usefuls: {
      isUseful: number;
      userId: string;
    }[];
    createdAt: Date;
  }[];
  votes: {
    value: number;
    userId: string;
  }[];
  userVote: number | undefined;
  averageVote: number;
  productId: string;
  product: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
