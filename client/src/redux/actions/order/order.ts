import axios from 'axios';
import { OrderDetailsI, OrderI } from '../../../customTypes';
import { Dispatch } from 'redux';
import { RootStore } from '../../store';
import { errorHandler } from '../../../utils/utils';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../../constants/order';

export const createOrder = (order: OrderI) => async (
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

    const { data } = await axios.post<OrderI>('/api/orders', order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const getOrderDetails = (orderId: string) => async (
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
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get<OrderDetailsI>(
      `/api/orders/${orderId}`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const payOrder = (orderId: string, paymentResult: object) => async (
  dispatch: Dispatch,
  getState: () => RootStore
) => {
  const { user } = getState();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.userDetails?.token}`,
    },
  };

  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: errorHandler(error),
    });
  }
};
