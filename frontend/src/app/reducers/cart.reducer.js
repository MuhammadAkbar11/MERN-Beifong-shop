/* eslint-disable */
import {
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
  CART_USER_LOAD,
  CART_ADD_ITEM_REQ,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQ,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
} from '@constants/cart.constants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, loading: false },
  action
) => {
  action.payload;
  switch (action.type) {
    case CART_ADD_ITEM_REQ:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
      };
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
      };
    case CART_REMOVE_ITEM_REQ:
      return {
        ...state,
        loading: true,
      };
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
      };
    case CART_REMOVE_ITEM_FAIL:
      return {
        ...state,
        errors: {
          message: 'Failed to remove cart',
        },
        loading: false,
      };

    case CART_USER_LOAD:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_RESET_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
