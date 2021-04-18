import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cart.constants';
import { PAGE_REDIRECT } from '../constants/page.constants';
/* eslint-disable */

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  const getProduct = await axios.get(`/api/products/${id}`);

  const { product } = getProduct.data;

  const newCartItem = {
    product: product._id,
    name: product.name,
    image: `/files/${product.image}`,
    price: product.price,
    countInStock: product.countInStock,
    qty: qty,
    subtotal: +qty * product.price.num,
  };

  const existCartItem = cartItems.find(x => x.product === newCartItem.product);

  let updatedCartItems;

  if (existCartItem) {
    updatedCartItems = cartItems.map(x => {
      return x.product === existCartItem.product ? newCartItem : x;
    });
  } else {
    updatedCartItems = [...cartItems, newCartItem];
  }

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      cartItems: updatedCartItems,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

  dispatch({
    type: PAGE_REDIRECT,
    payload: '/cart',
  });
};

export const removeFromCart = id => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  const updatedCartItems = cartItems.filter(x => x.product !== id);

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      cartItems: updatedCartItems,
    },
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
