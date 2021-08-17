type ShippingAdressType = {
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
};

export type ShopCart = {
  products: { product: any; count: number }[];
  totalAmount: number;
  coupon: {
    appliedCoupon: boolean;
    identifier: string;
  };
};

export interface IUser {
  _id: string;
  username: string | null;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  shippingAddresses: ShippingAdressType;
  role: string;
  cart: ShopCart;
}
