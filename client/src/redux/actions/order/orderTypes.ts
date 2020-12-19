import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../../constants/order';
import { OrderI, ErrorT } from '../../../customTypes';

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

export type OrderDispatchTypes =
  | OrderCreateRequest
  | OrderCreateSuccess
  | OrderCreateFail;