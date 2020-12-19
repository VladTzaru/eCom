import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../../constants/order';

import { OrderDispatchTypes } from '../../actions/order/orderTypes';
import { OrderI, ErrorT, Nullable } from '../../../customTypes';

export interface CreateOrderInitialStateI {
  order: Nullable<OrderI>;
  loading: boolean;
  success: boolean;
  error?: ErrorT<string>;
}

const initialState: CreateOrderInitialStateI = {
  order: null,
  success: false,
  loading: false,
};

const createdOrder = (state = initialState, action: OrderDispatchTypes) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default createdOrder;
