import axios from 'axios';
import { Dispatch } from 'redux';
import { errorHandler, addDataToLocalStorage } from '../../../utils/utils';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../../constants/user';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

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

    const { data } = await axios.post('/api/users', { email, password, name });

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

export const logout = () => (dispatch: Dispatch): void => {
  localStorage.removeItem('userDetails');
  dispatch({
    type: USER_LOGOUT,
  });
};
