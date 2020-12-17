import { ProductDispatchTypes } from '../../actions/product/productTypes';
import { ProductI, ErrorT } from '../../../customTypes';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../../constants/product';

interface ProductListInitialStateI {
  products: ProductI[];
  loading: boolean;
  error: ErrorT<string>;
}

const initialState: ProductListInitialStateI = {
  products: [],
  loading: false,
  error: null,
};

const productList = (
  state: ProductListInitialStateI = initialState,
  action: ProductDispatchTypes
): ProductListInitialStateI => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
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

export default productList;
