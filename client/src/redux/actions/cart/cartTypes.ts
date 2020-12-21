import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL,
} from '../../constants/cart';
import { CartProductI } from '../../../customTypes';

/////////////////////////////////////////
// Cart
/////////////////////////////////////////
export interface CartAddItem {
  type: typeof CART_ADD_ITEM;
  payload: CartProductI;
}

export interface CartRemoveItem {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export interface CartRemoveAll {
  type: typeof CART_REMOVE_ALL;
}

export type CartDispatchTypes = CartAddItem | CartRemoveItem | CartRemoveAll;
