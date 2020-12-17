import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { CartProductI, UserI } from '../customTypes';
import { getDataFromLocalStorage } from '../utils/utils';

interface InitialStateI {
  cart: {
    cartItems: CartProductI[];
  };
  user: {
    userDetails: UserI;
  };
}

const initialState: InitialStateI = {
  cart: {
    cartItems: getDataFromLocalStorage('cartItems', []),
  },
  user: {
    userDetails: getDataFromLocalStorage('userDetails', null),
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
