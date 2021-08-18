/* eslint-disable no-unused-vars */
import { createContext, FC, useReducer } from 'react';

export interface IAppContext {
  state: {
    showDrawer: boolean;
    redirectTo: string | null;
  };
  setRedirect: (prop: string) => void;
  setDrawer: (prop: boolean) => void;
}

interface IContextAction {
  type: string;
  payload: any;
}

const initialState: IAppContext = {
  state: {
    showDrawer: false,
    redirectTo: null,
  },
  setRedirect: () => {},
  setDrawer: () => {},
};

export const appContext = createContext(initialState);

const appReducer = (state: IAppContext['state'], action: IContextAction) => {
  switch (action.type) {
    case 'DRAWER':
      return {
        ...state,
        showDrawer: action.payload,
      };
    case 'REDIRECT':
      return {
        ...state,
        redirectTo: action.payload,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AppContextProvider: FC = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState.state);

  // actions creators
  const setRedirect = (path: string) =>
    dispatch({ type: 'REDIRECT', payload: path });
  const setDrawer = (open: boolean) =>
    dispatch({ type: 'DRAWER', payload: open });

  return (
    <appContext.Provider value={{ state: appState, setRedirect, setDrawer }}>
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
