/* eslint-disable no-unused-vars */
import { createContext, FC, useReducer } from 'react';
import { IUser } from '../types/user/User';

interface IAuthContext {
  user: IUser | null;
  authenticated: boolean;
}

interface IAuthContextFunctions {
  login: (prop: any) => void;
  logout: () => void;
  me: (prop: any) => void;
}

interface IContextAction {
  type: string;
  payload: any;
}

const initialState: IAuthContext = {
  user: null,
  authenticated: false,
};

const initialStateFunctions: IAuthContextFunctions = {
  login: () => {},
  logout: () => {},
  me: () => {},
};

export const authContext = createContext(initialState);
export const authFunctContext = createContext(initialStateFunctions);

const AuthProvider: FC = ({ children }) => {
  const authReducer = (state: IAuthContext, action: IContextAction) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          authenticated: true,
        };
      case 'LOGOUT':
        return initialState;

      case 'ME':
        return {
          ...state,
          user: action.payload,
          authenticated: true,
        };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const authFunctionsState = {
    login: async (userData: any) => {
      dispatch({
        type: 'LOGIN',
        payload: userData,
      });
    },

    logout: () => {
      dispatch({
        type: 'LOGOUT',
        payload: {},
      });
    },

    me: (userData: any) => {
      dispatch({
        type: 'ME',
        payload: userData,
      });
    },
  };

  return (
    <authContext.Provider value={authState}>
      <authFunctContext.Provider value={authFunctionsState}>
        {children}
      </authFunctContext.Provider>
    </authContext.Provider>
  );
};

export default AuthProvider;
