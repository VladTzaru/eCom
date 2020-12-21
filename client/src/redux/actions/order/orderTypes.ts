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
  ORDER_PAY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../../constants/order';
import { OrderI, ErrorT, OrderDetailsI } from '../../../customTypes';

/////////////////////////////////////////
// Create order
/////////////////////////////////////////
export interface OrderCreateRequest {
  type: typeof ORDER_CREATE_REQUEST;
}

export interface OrderCreateSuccess {
  type: typeof ORDER_CREATE_SUCCESS;
  payload: OrderI;
}

export interface OrderCreateFail {
  type: typeof ORDER_CREATE_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// Order details
/////////////////////////////////////////
export interface OrderDetailsRequest {
  type: typeof ORDER_DETAILS_REQUEST;
}

export interface OrderDetailsSuccess {
  type: typeof ORDER_DETAILS_SUCCESS;
  payload: OrderDetailsI;
}

export interface OrderDetailsFail {
  type: typeof ORDER_DETAILS_FAIL;
  payload: ErrorT<string>;
}

/////////////////////////////////////////
// Pay order
/////////////////////////////////////////
export interface OrderPayRequest {
  type: typeof ORDER_PAY_REQUEST;
}

export interface OrderPaySuccess {
  type: typeof ORDER_PAY_SUCCESS;
}

export interface OrderPayFail {
  type: typeof ORDER_PAY_FAIL;
  payload: ErrorT<string>;
}

export interface OrderPayReset {
  type: typeof ORDER_PAY_RESET;
}

/////////////////////////////////////////
// Order list
/////////////////////////////////////////
export interface OrderListRequest {
  type: typeof ORDER_LIST_REQUEST;
}

export interface OrderListSuccess {
  type: typeof ORDER_LIST_SUCCESS;
  payload: OrderI[];
}

export interface OrderListFail {
  type: typeof ORDER_LIST_FAIL;
  payload: ErrorT<string>;
}

export type OrderDispatchTypes =
  | OrderCreateRequest
  | OrderCreateSuccess
  | OrderCreateFail
  | OrderDetailsRequest
  | OrderDetailsSuccess
  | OrderDetailsFail
  | OrderPayRequest
  | OrderPaySuccess
  | OrderPayFail
  | OrderPayReset
  | OrderListRequest
  | OrderListSuccess
  | OrderListFail;
