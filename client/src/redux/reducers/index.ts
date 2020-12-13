import { combineReducers } from 'redux';

// Reducer imports
import { productList } from './product';

const reducer = combineReducers({
    productList,
});

export default reducer;
