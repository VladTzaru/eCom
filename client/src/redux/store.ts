import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { CartProductI } from '../customTypes';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') || '{}')
  : [];

const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails') || '{}')
  : null;

interface InitialStateI {
  cart: {
    cartItems: CartProductI[];
  };
  user: {
    userDetails: {};
  };
}

const initialState: InitialStateI = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  user: {
    userDetails: userDetailsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootStore = ReturnType<typeof rootReducer>;

export default store;
