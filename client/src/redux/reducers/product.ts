const initialState = {
    products: [],
    loading: false,
    error: null,
};

export const productList = (state = initialState, action: any) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return {
                ...state,
                loading: true,
            };

        case 'PRODUCT_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload,
            };

        case 'PRODUCT_LIST_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
