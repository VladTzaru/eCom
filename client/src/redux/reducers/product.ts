import { ProductDispatchTypes } from '../actions/product/productTypes';
import { ProductI } from '../../types/Product';
import { ErrorI } from '../../types/Error';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/product';

interface InitialStateI {
  products: ProductI[];
  loading: boolean;
  error?: ErrorI;
}

const initialState: InitialStateI = {
  products: [],
  loading: false,
};

export const productList = (
  state: InitialStateI = initialState,
  action: ProductDispatchTypes
): InitialStateI => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
