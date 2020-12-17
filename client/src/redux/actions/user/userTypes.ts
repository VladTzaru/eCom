import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../../constants/user';

import { UserI, ErrorT } from '../../../customTypes';

/////////////////////////////////////////
// Login / Logout
/////////////////////////////////////////
export interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: UserI;
}

export interface UserLoginFail {
  type: typeof USER_LOGIN_FAIL;
  payload: ErrorT<string>;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserDispatchTypes =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout;
