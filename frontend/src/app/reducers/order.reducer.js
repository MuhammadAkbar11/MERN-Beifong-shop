/* eslint-disable */
import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
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
