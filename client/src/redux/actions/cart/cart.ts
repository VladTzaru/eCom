import axios from 'axios';
import { Dispatch } from 'redux';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ALL,
} from '../../constants/cart';
import { CartDispatchTypes } from './cartTypes';
import { RootStore } from '../../store';
import { ProductI } from '../../../customTypes';
import {
  addDataFromReduxStateToLocalStorage,
  removeDataFromLocalStorage,
} from '../../../utils/utils';

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
): Promise<void> => {
  const { data } = await axios.get<ProductI>(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity: qty,
    },
  });

  addDataFromReduxStateToLocalStorage(
    'cartItems',
    () => getState().cart.cartItems
  );
};

export const removeFromCart = (id: string) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
): Promise<void> => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  addDataFromReduxStateToLocalStorage(
    'cartItems',
    () => getState().cart.cartItems
  );
};

export const removeAllFromCart = () => async (
  dispatch: Dispatch<CartDispatchTypes>
): Promise<void> => {
  dispatch({
    type: CART_REMOVE_ALL,
  });

  removeDataFromLocalStorage('cartItems');
};
