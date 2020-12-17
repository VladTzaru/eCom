import { UserDispatchTypes } from '../actions/user/userTypes';
import { UserI, Nullable, ErrorT } from '../../customTypes';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/user';

export interface UserInitialStateI {
  userDetails: Nullable<UserI>;
  loading?: boolean;
  error?: ErrorT<string>;
}

const initialState: UserInitialStateI = {
  userDetails: null,
  loading: false,
  error: null,
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
        error: null,
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
        userDetails: null,
        loading: false,
      };

    default:
      return state;
  }
};

export default userLogin;
