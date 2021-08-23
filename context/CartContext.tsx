/* eslint-disable no-unused-vars */
import { createContext, FC, useReducer } from 'react';
import { IProduct } from 'types/Product';
import { ShopCart } from 'types/user/User';
import { addProductToLS } from 'utils/cartFunctions';

interface AddProductCartPayload {
  authenticated: boolean;
  product: IProduct;
  quantity: number;
  totalAmount: number;
}

interface EditProductCartPayload {
  index: number;
  quantity: number;
  totalAmount: number;
}

interface RemoveProductCartPayload {
  index: number;
  totalAmount: number;
}

interface ICartContext {
  cart: ShopCart;
  addProductCart: (prop: AddProductCartPayload) => void;
  editProductCart: (prop: EditProductCartPayload) => void;
  removeProductCart: (prop: RemoveProductCartPayload) => void;
  setCartData: (prop: ShopCart) => void;
}

interface IContextAction {
  type: string;
  payload: ShopCart;
}

const initialState: ICartContext = {
  cart: {
    products: [],
    totalAmount: 0,
    coupon: {
      appliedCoupon: false,
      identifier: '',
    },
  },
  addProductCart: () => {},
  editProductCart: () => {},
  removeProductCart: () => {},
  setCartData: () => {},
};

export const cartContext = createContext(initialState);

const CartProvider: FC = ({ children }) => {
  const authReducer = (state: ICartContext['cart'], action: IContextAction) => {
    switch (action.type) {
      case 'EDIT_PRODUCT_CART':
        return action.payload;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [cartState, dispatch] = useReducer(authReducer, initialState.cart);

  const setCartData = (cart: ShopCart) =>
    dispatch({
      type: 'EDIT_PRODUCT_CART',
      payload: cart,
    });

  const addProductCart = ({
    product,
    quantity,
    totalAmount,
    authenticated,
  }: AddProductCartPayload) => {
    let newCart: ShopCart;
    if (authenticated) {
      newCart = { ...cartState };
      newCart.products.push({
        product,
        count: quantity,
      });
      newCart.totalAmount = totalAmount;
    } else {
      newCart = addProductToLS({ price: product.basePrice, quantity, product });
    }

    return dispatch({
      type: 'EDIT_PRODUCT_CART',
      payload: newCart,
    });
  };

  const editProductCart = ({
    index,
    quantity,
    totalAmount,
  }: EditProductCartPayload) => {
    const newCart: ShopCart = { ...cartState };
    newCart.products[index].count = quantity;
    newCart.totalAmount = totalAmount;

    return dispatch({
      type: 'EDIT_PRODUCT_CART',
      payload: newCart,
    });
  };

  const removeProductCart = ({
    index,
    totalAmount,
  }: RemoveProductCartPayload) => {
    const newCart: ShopCart = { ...cartState };
    newCart.products.splice(index, 1);
    newCart.totalAmount = totalAmount;
    return dispatch({
      type: 'EDIT_PRODUCT_CART',
      payload: newCart,
    });
  };

  return (
    <cartContext.Provider
      value={{
        cart: cartState,
        addProductCart,
        editProductCart,
        removeProductCart,
        setCartData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
