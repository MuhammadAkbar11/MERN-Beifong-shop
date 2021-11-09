/* eslint-disable */
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_USER_REQUEST,
  ORDER_USER_SUCCESS,
  ORDER_USER_FAIL,
  ORDER_USER_RESET,
} from '../constants/order.constants';

export const orderCreateReducer = (
  state = {
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        orderError: null,
        success: true,
        orderSuccess: action.payload.orderSuccess,
        order: action.payload.order,
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        orderSuccess: null,
        error: true,
        orderError: action.payload.errors,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        ...action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        errors: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_USER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_USER_SUCCESS:
      return {
        orders: action.payload,
        loading: false,
      };
    case ORDER_USER_FAIL:
      return {
        loading: false,
        errors: action.payload,
      };
    case ORDER_USER_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
