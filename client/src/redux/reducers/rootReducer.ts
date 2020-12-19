import { combineReducers } from 'redux';

// Reducer imports
import productList from './product/productList';
import productDetails from './product/productDetails';
import cart from './cart';
import user from './user/user';
import shipping from './user/shipping';
import paymentMethod from './user/paymentMethod';
import createOrder from './order';

const reducer = combineReducers({
  productList,
  productDetails,
  cart,
  user,
  shipping,
  paymentMethod,
  createOrder,
});

export default reducer;
