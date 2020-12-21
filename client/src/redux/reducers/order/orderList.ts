import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../../constants/order';

import { OrderDispatchTypes } from '../../actions/order/orderTypes';
import { OrderI, ErrorT } from '../../../customTypes';

export interface OrderListInitialStateI {
  orders: OrderI[];
  loading: boolean;
  error?: ErrorT<string>;
}

const initialState: OrderListInitialStateI = {
  orders: [],
  loading: false,
};

const orderList = (state = initialState, action: OrderDispatchTypes) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default orderList;
