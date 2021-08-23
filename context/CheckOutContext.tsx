/* eslint-disable no-unused-vars */
import { IUser, ShippingAddress } from 'types/user/User';
import { createContext, FC, useReducer } from 'react';
import ConfirmAuthForm from '@components/Forms/auth/ConfirmAuthForm';
import ShippingAddressForm from '@components/Forms/auth/ShippingAddressForm';
import CheckOutForm from '@components/Forms/auth/CheckOutForm';

export const checkOutSections = [
  {
    title: 'authentication',
    completed: false,
    active: true,
    component: <ConfirmAuthForm />,
  },
  {
    title: 'shipping',
    completed: false,
    active: false,
    component: <ShippingAddressForm />,
  },
  {
    title: 'payment',
    completed: false,
    active: false,
    component: <CheckOutForm />,
  },
  {
    title: 'confirmation',
    completed: false,
    active: false,
    component: <h1>Hello world!</h1>,
  },
];

const menuitems = checkOutSections.map((section) => ({
  title: section.title,
  completed: section.completed,
  active: section.active,
}));

interface ICheckOut {
  state: {
    menuData: typeof menuitems;
    addressData: ShippingAddress | null;
  };
  editMenuData: (index: number) => void;
  setAddressData: (address: ShippingAddress) => void;
  setState: (payload: ICheckOut['state']) => void;
}

interface IContextAction {
  type: string;
  payload: any;
}

const initialState: ICheckOut = {
  state: {
    menuData: menuitems,
    addressData: null,
  },
  editMenuData: () => {},
  setAddressData: () => {},
  setState: () => {},
};

export const checkOutContext = createContext(initialState);

const checkOutReducer = (state: ICheckOut['state'], action: IContextAction) => {
  switch (action.type) {
    case 'EDIT_MENU_DATA':
      return {
        ...state,
        menuData: action.payload as typeof menuitems,
      };
    case 'SET_ADDRESS_DATA':
      return {
        ...state,
        addressData: action.payload as ShippingAddress,
      };
    case 'SET_STATE':
      return action.payload as ICheckOut['state'];
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const updateLocalStorage = (state: ICheckOut['state']) => {
  const key = 'amazonias_checkout';
  const exist = localStorage.getItem(key);
  if (!exist) {
    localStorage.setItem(key, JSON.stringify(state));
  } else {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(state));
  }
};

const CheckOutContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(checkOutReducer, initialState.state);

  // actions creators

  const setAddressData = (address: ShippingAddress) =>
    dispatch({ type: 'SET_ADDRESS_DATA', payload: address });

  const editMenuData = (index: number) => {
    const newArray = [...state.menuData];
    newArray[index].completed = true;
    newArray[index].active = false;

    if (index < state.menuData.length - 1) {
      newArray[index + 1].active = true;
    }
    updateLocalStorage({ menuData: newArray, addressData: state.addressData });
    return dispatch({ type: 'EDIT_MENU_DATA', payload: newArray });
  };

  const setState = (payload: ICheckOut['state']) => {
    dispatch({ type: 'SET_STATE', payload });
  };

  return (
    <checkOutContext.Provider
      value={{ state, editMenuData, setAddressData, setState }}
    >
      {children}
    </checkOutContext.Provider>
  );
};

export default CheckOutContextProvider;
