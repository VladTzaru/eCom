import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../../constants/order';

import { OrderDispatchTypes } from '../../actions/order/orderTypes';
import { ErrorT, OrderDetailsI, Nullable } from '../../../customTypes';

export interface OrderDetailsInitialStateI {
  order: Nullable<OrderDetailsI>;
  loading?: boolean;
  error?: ErrorT<string>;
}

const initialState: OrderDetailsInitialStateI = {
  order: null,
};

const orderDetails = (state = initialState, action: OrderDispatchTypes) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderDetails;
