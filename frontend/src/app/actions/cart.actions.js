import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cart.constants';
/* eslint-disable */

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const { product } = data;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product._id,
      name: product.name,
      image: `/files/${product.image}`,
      price: product.price,
      countInStock: product.countInStock,
      qty: qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = data => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = method => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(method));
};
