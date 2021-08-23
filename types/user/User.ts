import { IProduct } from 'types/Product';

export type ShippingAddressPayload = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  address: string;
  secondAddress: string;
  description?: string;
};

export interface ShippingAddress extends ShippingAddressPayload {
  _id: string;
}

export type ShopCart = {
  products: { product: IProduct; count: number }[];
  totalAmount: number;
  coupon: {
    appliedCoupon: boolean;
    identifier: string;
  };
};

export interface IUser {
  _id: string;
  username: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  shippingAddresses: ShippingAddress[];
  role: string;
  cart: ShopCart;
  searchHistory: {
    text: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
