/* eslint-disable */
import axios from 'axios';
import { CART_RESET_ITEMS } from '../constants/cart.constants';
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
} from '../constants/order.constants';

export const createOrderAction = order => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: {
        orderSuccess: {
          message: data.message,
        },
        order: data.order,
      },
    });

    dispatch({ type: CART_RESET_ITEMS });
    localStorage.setItem('cartItems', JSON.stringify([]));
    // localStorage.removeItem('cartItems');
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: {
        errors: errData,
      },
    });
  }
};

export const getOrderDetailsAction = id => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: {
        order: data.order,
      },
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: {
        errors: errData,
      },
    });
  }
};
