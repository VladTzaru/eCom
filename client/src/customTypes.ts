import { ProductDetailsInitialStateI } from './redux/reducers/product/productDetails';
import { ProductListInitialStateI } from './redux/reducers/product/productList';
import { CartInitialStateI } from './redux/reducers/cart';
import { UserInitialStateI } from './redux/reducers/user/user';
import { ShippingInitialStateI } from './redux/reducers/user/shipping';
import { PaymentMethodInitialStateI } from './redux/reducers/user/paymentMethod';
import { CreateOrderInitialStateI } from './redux/reducers/order';

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
  orderItems: CartProductI[];
  totalItemsPrice: number;
  shippingAddress: ShippingI;
  shippingPrice: number;
  paymentMethod: string;
  totalPrice: number;
  taxPrice: number;
  _id?: string;
}

export type Nullable<T> = T | null;

export interface InitialStoreStateI {
  productList?: ProductListInitialStateI;
  productDetails?: ProductDetailsInitialStateI;
  cart?: CartInitialStateI;
  user?: UserInitialStateI;
  shipping?: ShippingInitialStateI;
  paymentMethod?: PaymentMethodInitialStateI;
  createdOrder?: CreateOrderInitialStateI;
}

export type ErrorT<T> = T | null;
