import { combineReducers } from 'redux';

// Reducer imports
import productList from './product/productList';
import productDetails from './product/productDetails';
import cart from './cart';
import user from './user';

const reducer = combineReducers({
  productList,
  productDetails,
  cart,
  user,
});

export default reducer;