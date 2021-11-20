import axios from 'axios';
import {
  PRODUCT_ADMIN_ALERT,
  PRODUCT_ADMIN_ALERT_CLOSE,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQ,
  PRODUCT_DELETE_SUCCESS,
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

export const resetProductListAlertAction = () => async dispatch => {
  dispatch({ type: PRODUCT_ADMIN_ALERT_CLOSE });
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

export const deleteProductAction = productID => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: PRODUCT_DELETE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${productID}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });

    dispatch({
      type: PRODUCT_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message: data?.message,
      },
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData = error.response.data?.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: {
        errors: errData,
        loading: false,
      },
    });

    dispatch({
      type: PRODUCT_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message:
          errData?.message ||
          errData?.errors?.message ||
          'Failed to delete user',
      },
    });
  }
};
