import axios from 'axios';
import { Dispatch } from 'redux';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../../constants/cart';
import { CartDispatchTypes } from './cartTypes';
import { RootStore } from '../../store';
import { ProductI } from '../../../customTypes';

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

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: string) => async (
  dispatch: Dispatch<CartDispatchTypes>,
  getState: () => RootStore
): Promise<void> => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
