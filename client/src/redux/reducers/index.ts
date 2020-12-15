import { combineReducers } from 'redux';

// Reducer imports
import productList from './product/productList';
import productDetails from './product/productDetails';
import cart from './cart';

const reducer = combineReducers({
  productList,
  productDetails,
  cart,
});

export default reducer;
