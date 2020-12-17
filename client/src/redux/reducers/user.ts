import { UserDispatchTypes } from '../actions/user/userTypes';
import { UserI } from '../../customTypes';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/user';

interface UserInitialStateI {
  userDetails: UserI | {};
  loading?: boolean;
  error?: string;
}

const initialState: UserInitialStateI = {
  userDetails: {},
  loading: false,
};

const userLogin = (
  state: UserInitialStateI = initialState,
  action: UserDispatchTypes
): UserInitialStateI => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        userDetails: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default userLogin;
