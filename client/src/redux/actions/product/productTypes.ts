import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../constants/product';
import { ProductI } from '../../../types/Product';
import { ErrorI } from '../../../types/Error';

/////////////////////////////////////////
// Product list
/////////////////////////////////////////
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

/////////////////////////////////////////
// Product details
/////////////////////////////////////////
export interface ProductDetailsRequest {
  type: typeof PRODUCT_DETAILS_REQUEST;
}

export interface ProductDetailsSuccess {
  type: typeof PRODUCT_DETAILS_SUCCESS;
  payload: ProductI;
}

export interface ProductDetailsFail {
  type: typeof PRODUCT_DETAILS_FAIL;
  payload: ErrorI;
}

export type ProductDispatchTypes =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail
  | ProductDetailsRequest
  | ProductDetailsSuccess
  | ProductDetailsFail;
