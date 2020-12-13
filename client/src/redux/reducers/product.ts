import {
    ErrorI,
    Product,
    ProductDispatchTypes,
} from '../actions/product/productTypes';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constants/product';

interface InitialStateI {
    products: Product[];
    loading: boolean;
    error?: ErrorI;
}

const initialState: InitialStateI = {
    products: [],
    loading: false,
};

export const productList = (
    state: InitialStateI = initialState,
    action: ProductDispatchTypes
): InitialStateI => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
