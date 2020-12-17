import { ProductDetailsInitialStateI } from './redux/reducers/product/productDetails';
import { ProductListInitialStateI } from './redux/reducers/product/productList';
import { CartInitialStateI } from './redux/reducers/cart';
import { UserInitialStateI } from './redux/reducers/user';

export interface ProductI {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[];
}

export interface CartProductI {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

export interface MatchParamsI {
  name: string;
  id: string;
}

export interface UserI {
  _id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  token?: string;
}

export type Nullable<T> = T | null;

export interface InitialStoreStateI {
  productList?: ProductListInitialStateI;
  productDetails?: ProductDetailsInitialStateI;
  cart?: CartInitialStateI;
  user?: UserInitialStateI;
}

export type ErrorT<T> = T | null;
