/* eslint-disable no-unused-vars */
import { createContext, FC, useReducer } from 'react';
import { ISubCategory } from '../types/SubCategory';
import { CategorySubs } from '../types/Category';
import { DepartmentsMenu } from '../types/Department';

export interface IFilterContext {
  department: DepartmentsMenu | null;
  category: CategorySubs | null;
  sub: ISubCategory | null;
  price: number[] | null;
  brand: string[] | null;
  vendor: string[] | null;
  condition: string[] | null;
  rating: number;
  sort: string;
}

interface ISetters {
  setDepartment: (department: DepartmentsMenu | null) => void;
  setCategory: (category: CategorySubs | null) => void;
  setSub: (sub: ISubCategory | null) => void;
  setBrand: (names: string[]) => void;
  setVendor: (vendorsId: string[]) => void;
  setPrice: (range: [number, number]) => void;
  setRating: (rating: number) => void;
  setCondition: (state: string[]) => void;
  setSort: (sort: string) => void;
  setInitialState: () => void;
}

const initialState: IFilterContext = {
  department: null,
  category: null,
  sub: null,
  price: null,
  brand: null,
  vendor: null,
  condition: null,
  rating: 0,
  sort: 'average-review',
};

const initialSetters: ISetters = {
  setDepartment: (department: DepartmentsMenu | null) => {},
  setCategory: (category: CategorySubs | null) => {},
  setSub: (sub: ISubCategory | null) => {},
  setBrand: (names: string[]) => {},
  setVendor: (vendorsId: string[]) => {},
  setPrice: (range: [number, number]) => {},
  setRating: (rating: number) => {},
  setCondition: (state: string[]) => {},
  setSort: (sort: string) => {},
  setInitialState: () => {},
};

interface IContextAction {
  type: string;
  payload: any;
}

export const filterContext = createContext(initialState);
export const filterSettersContext = createContext(initialSetters);

const filterReducer = (state: IFilterContext, action: IContextAction) => {
  switch (action.type) {
    case 'DEPARTMENT':
      return {
        ...state,
        department: action.payload,
      };
    case 'CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'SUBCATEGORY':
      return {
        ...state,
        sub: action.payload,
      };
    case 'PRICE':
      return {
        ...state,
        price: action.payload,
      };
    case 'BRAND':
      return {
        ...state,
        brand: action.payload,
      };
    case 'VENDOR':
      return {
        ...state,
        vendor: action.payload,
      };
    case 'CONDITION':
      return {
        ...state,
        state: action.payload,
      };
    case 'RATING':
      return {
        ...state,
        rating: action.payload,
      };
    case 'SORT':
      return {
        ...state,
        sort: action.payload,
      };

    case 'RESET':
      return initialState;

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FilterProvider: FC = ({ children }) => {
  const [filterState, dispatch] = useReducer(filterReducer, initialState);

  const filterSetters = {
    setDepartment: (department: DepartmentsMenu | null) => {
      dispatch({
        type: 'DEPARTMENT',
        payload: department,
      });
    },

    setCategory: (category: CategorySubs | null) => {
      dispatch({
        type: 'CATEGORY',
        payload: category,
      });
    },

    setSub: (sub: ISubCategory | null) => {
      dispatch({
        type: 'SUBCATEGORY',
        payload: sub,
      });
    },

    setBrand: (names: string[]) => {
      dispatch({
        type: 'BRAND',
        payload: names,
      });
    },

    setVendor: (vendorsId: string[]) => {
      dispatch({
        type: 'VENDOR',
        payload: vendorsId,
      });
    },

    setPrice: (range: [number, number]) => {
      dispatch({
        type: 'PRICE',
        payload: range,
      });
    },

    setRating: (rating: number) => {
      dispatch({
        type: 'RATING',
        payload: rating,
      });
    },

    setCondition: (state: string[]) => {
      dispatch({
        type: 'CONDITION',
        payload: state,
      });
    },

    setSort: (sort: string) => {
      dispatch({
        type: 'SORT',
        payload: sort,
      });
    },

    setInitialState: () => {
      dispatch({
        type: 'RESET',
        payload: null,
      });
    },
  };

  return (
    <filterContext.Provider value={filterState}>
      <filterSettersContext.Provider value={filterSetters}>
        {children}
      </filterSettersContext.Provider>
    </filterContext.Provider>
  );
};

export default FilterProvider;
