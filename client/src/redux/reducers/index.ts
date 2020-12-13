import { combineReducers } from 'redux';

// Reducer imports
import productList from './product/productList';
import productDetails from './product/productDetails';

const reducer = combineReducers({
  productList,
  productDetails,
});

export default reducer;
