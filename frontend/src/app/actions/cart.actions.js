import axios from 'axios';
import {
  CART_ADD_ITEM_REQ,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQ,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cart.constants';
import { PAGE_REDIRECT } from '../constants/page.constants';
/* eslint-disable */

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
    cart: { cartItems },
  } = getState();

  dispatch({
    type: CART_ADD_ITEM_REQ,
  });

  try {
    const getProduct = await axios.get(`/api/products/${id}`);

    const { product } = getProduct.data;
    let updatedCartItems = cartItems;
    if (!userInfo) {
      const newCartItem = {
        product: product._id,
        name: product.name,
        image: `/files/${product.image}`,
        price: product.price,
        countInStock: product.countInStock,
        qty: qty,
        subtotal: +qty * product.price.num,
      };

      const existCartItem = cartItems.find(
        x => x.product === newCartItem.product
      );

      if (existCartItem) {
        updatedCartItems = cartItems.map(x => {
          return x.product === existCartItem.product ? newCartItem : x;
        });
      } else {
        updatedCartItems = [...cartItems, newCartItem];
      }
    } else {
      const userToken = userInfo.token;
      const userAddNewCartItem = await axios.post(
        `/api/users/cart?product=${product._id}&qty=${qty}`,
        { cartItems: [] },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const updatedUserCartItems = userAddNewCartItem.data.cart;

      updatedCartItems = updatedUserCartItems.items.map(item => {
        return {
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: `/files/${item.product.image}`,
          countInStock: item.product.countInStock,
          subtotal: item.subtotal,
          qty: item.qty,
        };
      });
    }

    setTimeout(() => {
      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload: {
          cartItems: updatedCartItems,
        },
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );

      dispatch({
        type: PAGE_REDIRECT,
        payload: '/cart',
      });
    }, 1000);
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
      type: CART_ADD_ITEM_FAIL,
      payload: errData,
    });
  }
};

export const removeFromCart = id => (dispatch, getState) => {
  const {
    userLogin: { userInfo },
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
