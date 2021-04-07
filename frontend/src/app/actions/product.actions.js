import axios from 'axios';
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCCESS,
} from '../constants/product.constants';

/* eslint-disable */
export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQ });
    const { data } = await axios.get('/api/products');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    console.log(error);

    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      errData = {
        message: error.response.data.message,
      };
    }

    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: errData.message,
    });
  }
};

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQ });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      errData = {
        message: error.response.data.message,
      };
    }

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errData.message,
    });
  }
};
