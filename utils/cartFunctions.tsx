import { ShopCart } from 'types/user/User';
import { IProduct } from 'types/Product';

const cartKey = 'amazonias_cart';

export const addProductToLS = ({
  product,
  quantity,
  price,
}: {
  product: IProduct;
  quantity: number;
  price: number;
}) => {
  const cart = JSON.parse(localStorage.getItem(cartKey)!) as ShopCart;

  const index = cart.products.findIndex(
    (element) => element.product._id.toString() === product._id.toString()
  );

  if (index !== -1) {
    cart.products[index].count += quantity;
  } else {
    cart.products.push({ product, count: quantity });
  }

  cart.totalAmount += price * quantity;
  localStorage.removeItem(cartKey);

  localStorage.setItem(cartKey, JSON.stringify(cart));
  return cart;
};

export const editProductFromLS = ({
  productId,
  quantity,
  price,
}: {
  productId: string;
  quantity: number;
  price: number;
}) => {
  const cart = JSON.parse(localStorage.getItem(cartKey)!) as ShopCart;

  const index = cart.products.findIndex(
    ({ product }) => product._id.toString() === productId.toString()
  );

  cart.totalAmount += (quantity - cart.products[index].count) * price;
  cart.products[index].count = quantity;

  localStorage.removeItem(cartKey);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  return cart;
};

export const removeProductFromLS = ({
  productId,
  price,
  count,
}: {
  productId: string;
  price: number;
  count: number;
}) => {
  const cart = JSON.parse(localStorage.getItem(cartKey)!) as ShopCart;

  cart.products = cart.products.filter(
    ({ product }) => product._id.toString() !== productId.toString()
  );

  cart.totalAmount -= price * count;

  localStorage.removeItem(cartKey);
  localStorage.setItem(cartKey, JSON.stringify(cart));
  return cart;
};

export const getCartFormLS = () => {
  const cart = localStorage.getItem(cartKey);

  if (cart) {
    return JSON.parse(cart) as ShopCart;
  }
  return null;
};

export const saveCartToLS = (cart: ShopCart) => {
  localStorage.setItem(cartKey, JSON.stringify(cart));
};
