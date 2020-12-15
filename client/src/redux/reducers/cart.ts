import { CartDispatchTypes } from '../actions/cart/cartTypes';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cart';
import { CartProductI } from '../../customTypes';

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
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === alreadyAddedToCart.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default cart;
