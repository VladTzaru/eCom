import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../constants/product';
import { ProductI } from '../../../types/Product';
import { ErrorI } from '../../../types/Error';

export interface ProductListRequest {
  type: typeof PRODUCT_LIST_REQUEST;
}

export interface ProductListSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: ProductI[];
}

export interface ProductListFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: ErrorI;
}

export type ProductDispatchTypes =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail;
