import { ProductDispatchTypes } from '../../actions/product/productTypes';
import { ErrorI } from '../../../types/Error';
import { ProductI } from '../../../types/Product';

import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../constants/product';

interface InitialStateI {
  product: ProductI;
  loading: boolean;
  error?: ErrorI;
}

const product = {} as ProductI;

const initialState: InitialStateI = {
  product,
  loading: false,
};

const productDetails = (
  state: InitialStateI = initialState,
  action: ProductDispatchTypes
): InitialStateI => {
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
