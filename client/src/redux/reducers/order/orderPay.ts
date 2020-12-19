import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from '../../constants/order';

import { OrderDispatchTypes } from '../../actions/order/orderTypes';
import { CreateOrderInitialStateI } from './order';

export interface PayOrderInitialStateI extends CreateOrderInitialStateI {}

const initialState: PayOrderInitialStateI = {
  order: null,
  success: false,
  loading: false,
};

const orderPayed = (state = initialState, action: OrderDispatchTypes) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {
        ...state,
        order: null,
      };

    default:
      return state;
  }
};

export default orderPayed;
