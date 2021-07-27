/* eslint-disable no-unused-vars */
import { createContext, FC, useEffect, useReducer } from 'react';
import { useMutation } from 'react-query';
import { LoadingOutlined } from '@ant-design/icons';
import { IUser } from '../types/user/User';
import { meRequest } from '../api/authentication/index';
import Center from '../components/Layout/Containers/Center';

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

  const { isLoading, mutate } = useMutation(meRequest, {
    onSuccess: ({ status, data }) => {
      if (status === 200) {
        authFunctionsState.me(data.user);
      }
    },
    onError: () => {},
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <authContext.Provider value={authState}>
      <authFunctContext.Provider value={authFunctionsState}>
        {isLoading ? (
          <Center>
            {' '}
            <LoadingOutlined size={40} />{' '}
          </Center>
        ) : (
          children
        )}
      </authFunctContext.Provider>
    </authContext.Provider>
  );
};

export default AuthProvider;
