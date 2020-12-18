import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
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

/////////////////////////////////////////
// Register
/////////////////////////////////////////
export interface UserRegisterRequest {
  type: typeof USER_REGISTER_REQUEST;
}

export interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS;
  payload: UserI;
}

export interface UserRegisterFail {
  type: typeof USER_REGISTER_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// Update
/////////////////////////////////////////
export interface UserUpdateRequest {
  type: typeof USER_UPDATE_REQUEST;
}

export interface UserUpdateSuccess {
  type: typeof USER_UPDATE_SUCCESS;
  payload: UserI;
}

export interface UserUpdateFail {
  type: typeof USER_UPDATE_FAIL;
  payload: ErrorT<string>;
}

export type UserDispatchTypes =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFail
  | UserUpdateRequest
  | UserUpdateSuccess
  | UserUpdateFail;
