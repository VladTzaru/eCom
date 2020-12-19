import axios from 'axios';
import { OrderDataI } from '../../../customTypes';
import { Dispatch } from 'redux';
import { RootStore } from '../../store';
import { errorHandler, addDataToLocalStorage } from '../../../utils/utils';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../../constants/order';

export const createOrder = (order: OrderDataI) => async (
  dispatch: Dispatch,
  getState: () => RootStore
) => {
  const { user } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${user.userDetails?.token}`,
    },
  };

  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const { data } = await axios.post<OrderDataI>('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    addDataToLocalStorage('orderDetails', data);
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }
};
