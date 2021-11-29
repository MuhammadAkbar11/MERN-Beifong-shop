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
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_RESET,
  ORDER_LIST_FAIL,
  ORDER_LIST_ALERT,
  ORDER_LIST_ALERT_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
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

    const { data } = await axios.get(`/api/orders/details/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: {
        order: data,
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

export const payOrderAction = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
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
      type: ORDER_PAY_FAIL,
      payload: {
        errors: errData,
      },
    });
  }
};

export const confirmOrderDeliverAction = orderId => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data?.order,
    });

    dispatch({
      type: ORDER_LIST_ALERT,
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
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: errData,
    });

    dispatch({
      type: ORDER_LIST_ALERT,
      payload: {
        open: true,
        type: 'danger',
        message: errData.message,
      },
    });
  }
};

export const getListMyOrdersAction = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_USER_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_USER_SUCCESS,
      payload: data.orders,
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
      type: ORDER_USER_FAIL,
      payload: {
        errors: errData,
      },
    });
  }
};

export const payOrderResetAction = () => (dispatch, getState) => {
  dispatch({
    type: ORDER_PAY_RESET,
  });
};

export const orderListAlertResetAction = () => (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_ALERT_RESET,
  });
};

export const getListOrderAction = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.orders,
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
      type: ORDER_LIST_FAIL,
      payload: errData,
    });
  }
};
