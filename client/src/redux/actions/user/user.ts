import axios from 'axios';
import { Dispatch } from 'redux';
import { UserI } from '../../../customTypes';
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
} from '../../constants/user';

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
