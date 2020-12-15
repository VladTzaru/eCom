import { CartDispatchTypes } from '../actions/cart/cartTypes';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart';
import { CartProductI } from '../../types/Product';

interface CartInitialStateI {
  cartItems: CartProductI[];
}

const initialState: CartInitialStateI = {
  cartItems: [],
};

const cart = (state = initialState, action: CartDispatchTypes) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const alreadyAddedToCart = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (alreadyAddedToCart) {
        console.log('bango');
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === alreadyAddedToCart.product ? item : i
          ),
        };
      } else {
        console.log('fucki');
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
};

export default cart;
