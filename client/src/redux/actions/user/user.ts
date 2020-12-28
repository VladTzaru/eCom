import axios from 'axios';
import { Dispatch } from 'redux';
import { ShippingI, UserI } from '../../../customTypes';
import { errorHandler, addDataToLocalStorage } from '../../../utils/utils';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_SAVE_SHIPPING_INFO,
  USER_SAVE_PAYMENT_METHOD,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../../constants/user';
import { RootStore } from '../../store';

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post<UserI>('/api/users/login', {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    addDataToLocalStorage('userDetails', data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const register = (
  email: string,
  password: string,
  name: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const { data } = await axios.post<UserI>('/api/users', {
      email,
      password,
      name,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const update = (
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
  token: string
) => async (dispatch: Dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const payload = { email, password, confirmPassword, name, token };

    const { data } = await axios.put<UserI>(
      '/api/users/profile',
      payload,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    addDataToLocalStorage('userDetails', data);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const logout = () => (dispatch: Dispatch): void => {
  localStorage.removeItem('userDetails');
  dispatch({
    type: USER_LOGOUT,
  });
};

export const saveShippingInfo = (info: ShippingI) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: USER_SAVE_SHIPPING_INFO,
    payload: info,
  });
  addDataToLocalStorage('shippingInfo', info);
};

export const savePaymentMethod = (method: string) => (
  dispatch: Dispatch
): void => {
  dispatch({
    type: USER_SAVE_PAYMENT_METHOD,
    payload: method,
  });
  addDataToLocalStorage('paymentMethod', method);
};

export const getAllUsers = () => async (
  dispatch: Dispatch,
  getState: () => RootStore
): Promise<void> => {
  const token = getState().user.userDetails?.token;

  try {
    dispatch({
      type: USERS_LIST_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const deleteUser = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => RootStore
): Promise<void> => {
  const token = getState().user.userDetails?.token;

  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete<UserI>(`/api/users/${userId}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const getUserProfile = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => RootStore
): Promise<void> => {
  const token = getState().user.userDetails?.token;

  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get<UserI>(`/api/users/${userId}`, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: errorHandler(error),
    });
  }
};
