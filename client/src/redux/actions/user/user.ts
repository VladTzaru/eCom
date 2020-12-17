import axios from 'axios';
import { Dispatch } from 'redux';
import { errorHandler, addDataToLocalStorage } from '../../../utils/utils';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../../constants/user';

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

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

export const logout = () => (dispatch: Dispatch): void => {
  localStorage.removeItem('userDetails');
  dispatch({
    type: USER_LOGOUT,
  });
};
