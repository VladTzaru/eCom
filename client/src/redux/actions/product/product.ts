import { Dispatch } from 'redux';
import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../../constants/product';
import { ProductDispatchTypes } from './productTypes';
import { ProductI } from '../../../customTypes';
import { errorHandler } from '../../../utils/utils';

export const listProducts = () => async (
  dispatch: Dispatch<ProductDispatchTypes>
) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get<ProductI[]>('/api/products');

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: errorHandler(error),
    });
  }
};

export const productDetails = (id: string) => async (
  dispatch: Dispatch<ProductDispatchTypes>
) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get<ProductI>(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }
};
