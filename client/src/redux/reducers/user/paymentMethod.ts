import { UserDispatchTypes } from '../../actions/user/userTypes';

import { USER_SAVE_PAYMENT_METHOD } from '../../constants/user';

export interface PaymentMethodInitialStateI {
  selected: string;
}

const initialState: PaymentMethodInitialStateI = {
  selected: '',
};

const paymentMethod = (
  state: PaymentMethodInitialStateI = initialState,
  action: UserDispatchTypes
): PaymentMethodInitialStateI => {
  switch (action.type) {
    case USER_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        selected: action.payload,
      };

    default:
      return state;
  }
};

export default paymentMethod;
