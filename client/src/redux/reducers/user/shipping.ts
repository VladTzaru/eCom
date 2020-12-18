import { UserDispatchTypes } from '../../actions/user/userTypes';
import { ShippingI } from '../../../customTypes';

import { USER_SAVE_SHIPPING_INFO } from '../../constants/user';

export interface ShippingInitialStateI {
  shippingInfo: ShippingI;
}

const initialState: ShippingInitialStateI = {
  shippingInfo: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
};

const shipping = (
  state: ShippingInitialStateI = initialState,
  action: UserDispatchTypes
): ShippingInitialStateI => {
  switch (action.type) {
    case USER_SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

export default shipping;
