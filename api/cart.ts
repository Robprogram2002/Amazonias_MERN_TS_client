import {
  IUser,
  ShippingAddress,
  ShippingAddressPayload,
} from 'types/user/User';
import axios from 'axios';
import { IProduct } from 'types/Product';

interface CartPayload {
  productId: string;
  price: number;
}

interface AddProductPayload extends CartPayload {
  quantity: number;
}

export const fetchCartData = async () => {
  const { data } = await axios.get<IUser['cart']>('/user/cart/fetch-cart');
  return data;
};

export const addPrductToCart = async (data: AddProductPayload) =>
  axios.post<{
    product: IProduct;
    quantity: number;
    status: string;
    index: number;
    totalAmount: number;
  }>(`/user/cart/add-product`, {
    ...data,
  });

export const removeProductFromCart = async (data: CartPayload) =>
  axios.patch<{ index: number; totalAmount: number }>(
    `/user/cart/remove-product`,
    {
      ...data,
    }
  );

export const editProductQuantity = async (data: AddProductPayload) =>
  axios.patch<{
    index: number;
    quantity: number;
    totalAmount: number;
  }>(`/user/cart/edit-quantity`, {
    ...data,
  });

export const addUserShippingAddress = async (data: ShippingAddressPayload) =>
  axios.post<ShippingAddress>('/user/address', { ...data });

export const removeUserShippingAddress = async (addressId: string) =>
  axios.delete<IUser['shippingAddresses']>(`/user/address/${addressId}`);

export const editUserShippingAddress = async (data: ShippingAddress) =>
  axios.patch<IUser['shippingAddresses']>(`/user/address/${data._id}`, {
    ...data,
  });

export const createPaymentSession = async (cart: IUser['cart']) =>
  axios.post<string>('/user/checkout/create-session', { cart });

export const createPaymentIntent = async (cart: IUser['cart']) =>
  axios.post<{
    clientSecret: string;
  }>('/user/checkout/create-payment', { cart });

export const createSetUpIntent = async (customerId: string | null) =>
  axios.post<{
    clientSecret: string;
  }>('/user/checkout/create-setup', { customerId });
