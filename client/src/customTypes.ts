import { ProductDetailsInitialStateI } from './redux/reducers/product/productDetails';
import { ProductListInitialStateI } from './redux/reducers/product/productList';
import { CartInitialStateI } from './redux/reducers/cart';
import { UserInitialStateI } from './redux/reducers/user/user';
import { ShippingInitialStateI } from './redux/reducers/user/shipping';
import { PaymentMethodInitialStateI } from './redux/reducers/user/paymentMethod';

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

export interface ShippingI {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface OrderI {
  cartItems: CartProductI[];
  totalItemsPrice: number;
  shippingAddress: ShippingI;
  totalShippingCost: number;
  paymentMethod: string;
  totalPrice: number;
  tax: number;
}

export type Nullable<T> = T | null;

export interface InitialStoreStateI {
  productList?: ProductListInitialStateI;
  productDetails?: ProductDetailsInitialStateI;
  cart?: CartInitialStateI;
  user?: UserInitialStateI;
  shipping?: ShippingInitialStateI;
  paymentMethod?: PaymentMethodInitialStateI;
}

export type ErrorT<T> = T | null;
