import { IUser } from 'types/user/User';
import axios from 'axios';

interface CartPayload {
  productId: string;
  price: number;
}

interface AddProductPayload extends CartPayload {
  quantity: number;
}

interface EditProductQuantity extends CartPayload {
  action: string;
}

export const addPrductToCart = async (data: AddProductPayload) =>
  axios.post<IUser['cart']>(`/users/cart/add-product`, {
    ...data,
  });

export const removeProductFromCart = async (data: CartPayload) =>
  axios.patch<IUser['cart']>(`/users/cart/remove-product`, {
    ...data,
  });

export const editProductQuantity = async (data: EditProductQuantity) =>
  axios.patch<IUser['cart']>(`/users/cart/edit-quantity`, {
    ...data,
  });
