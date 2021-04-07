import axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCCESS,
} from '../constants/product.constants';

/* eslint-disable */
export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQ });

    const { data } = await axios.get('/api/products');
    console.log(data);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    console.log(error.response, 'actions');
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
