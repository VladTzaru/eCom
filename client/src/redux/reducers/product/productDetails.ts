import { ProductDispatchTypes } from '../../actions/product/productTypes';
import { ProductI } from '../../../types/Product';

import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../constants/product';

interface ProductDetailsInitialStateI {
  product: ProductI;
  loading: boolean;
  error?: string;
}

const product = {} as ProductI;

const initialState: ProductDetailsInitialStateI = {
  product,
  loading: false,
};

const productDetails = (
  state: ProductDetailsInitialStateI = initialState,
  action: ProductDispatchTypes
): ProductDetailsInitialStateI => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productDetails;
