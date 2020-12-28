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
  USER_SAVE_SHIPPING_INFO,
  USER_SAVE_PAYMENT_METHOD,
  USERS_LIST_SUCCESS,
  USERS_LIST_REQUEST,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../../constants/user';

import { UserI, ErrorT, ShippingI } from '../../../customTypes';

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

/////////////////////////////////////////
// Get all users (admin)
/////////////////////////////////////////
export interface UsersListRequest {
  type: typeof USERS_LIST_REQUEST;
}

export interface UsersListSuccess {
  type: typeof USERS_LIST_SUCCESS;
  payload: UserI[];
}

export interface UsersListFail {
  type: typeof USERS_LIST_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// Shipping
/////////////////////////////////////////
export interface UserSaveShippingInfo {
  type: typeof USER_SAVE_SHIPPING_INFO;
  payload: ShippingI;
}

/////////////////////////////////////////
// Payment method
/////////////////////////////////////////
export interface UserSavePaymentMethod {
  type: typeof USER_SAVE_PAYMENT_METHOD;
  payload: string;
}

/////////////////////////////////////////
// Delete user
/////////////////////////////////////////
export interface UserDeleteRequest {
  type: typeof USER_DELETE_REQUEST;
}

export interface UserDeleteSuccess {
  type: typeof USER_DELETE_SUCCESS;
  payload: UserI;
}

export interface UserDeleteFail {
  type: typeof USER_DELETE_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// User profile information
/////////////////////////////////////////
export interface UserProfileRequest {
  type: typeof USER_PROFILE_REQUEST;
}

export interface UserProfileSuccess {
  type: typeof USER_PROFILE_SUCCESS;
  payload: UserI;
}

export interface UserProfileFail {
  type: typeof USER_PROFILE_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// Update user profile information
/////////////////////////////////////////
export interface UserUpdateProfileRequest {
  type: typeof USER_UPDATE_PROFILE_REQUEST;
}

export interface UserUpdateProfileSuccess {
  type: typeof USER_UPDATE_PROFILE_SUCCESS;
  payload: UserI;
}

export interface UserUpdateProfileFail {
  type: typeof USER_UPDATE_PROFILE_FAIL;
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
  | UserUpdateFail
  | UserSaveShippingInfo
  | UserSavePaymentMethod
  | UsersListRequest
  | UsersListSuccess
  | UsersListFail
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFail
  | UserProfileRequest
  | UserProfileSuccess
  | UserProfileFail
  | UserUpdateProfileRequest
  | UserUpdateProfileSuccess
  | UserUpdateProfileFail;
