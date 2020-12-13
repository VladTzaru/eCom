import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../../constants/product';

export interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

export interface ErrorI {
    error: string;
}

export interface ProductListRequest {
    type: typeof PRODUCT_LIST_REQUEST;
}

export interface ProductListSuccess {
    type: typeof PRODUCT_LIST_SUCCESS;
    payload: Product[];
}

export interface ProductListFail {
    type: typeof PRODUCT_LIST_FAIL;
    payload: ErrorI;
}

export type ProductDispatchTypes =
    | ProductListRequest
    | ProductListSuccess
    | ProductListFail;
