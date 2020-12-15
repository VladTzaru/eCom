import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../../constants/cart';
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
}

export type CartDispatchTypes = CartAddItem | CartRemoveItem;
