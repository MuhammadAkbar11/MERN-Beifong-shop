import axios from 'axios';
import { axiosPrivate } from '@utils/api';
import {
  CART_ADD_ITEM_REQ,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM_REQ,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '@constants/cart.constants';
import { LOGOUT_SESSION } from '@constants/session.contants';

/* eslint-disable */

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    session: { userInfo },
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
        image: product.image,
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
      const userAddNewCartItem = await axiosPrivate.post(
        `/users/cart?product=${product._id}&qty=${qty}`,
        { cartItems: [] }
      );
      const updatedUserCartItems = userAddNewCartItem.data.cart;

      updatedCartItems = updatedUserCartItems.items.map(item => {
        return {
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          countInStock: item.product.countInStock,
          subtotal: item.subtotal,
          qty: item.qty,
        };
      });
    }

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

    return true;
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

    if (userInfo && error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
    }
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: errData,
    });
    throw errData;
  }
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM_REQ,
  });

  const {
    session: { userInfo },
    cart: { cartItems },
  } = getState();

  if (userInfo) {
    try {
      let updatedCartItems = cartItems;

      const removeCartItem = await axiosPrivate.post(`/users/cart/delete`, {
        product: id,
      });

      const updatedUserCart = removeCartItem.data.cart;

      updatedCartItems = updatedUserCart.items.map(item => {
        return {
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: `${item.product.image}`,
          countInStock: item.product.countInStock,
          subtotal: item.subtotal,
          qty: item.qty,
        };
      });
      dispatch({
        type: CART_REMOVE_ITEM_SUCCESS,
        payload: {
          cartItems: updatedCartItems,
        },
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log(error);
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

      if (userInfo && error.response.data?.errors?.notAuth) {
        dispatch({
          type: LOGOUT_SESSION,
          payload: {
            isLogout: true,
          },
        });
      }

      dispatch({
        type: CART_REMOVE_ITEM_FAIL,
        payload: errData,
      });
    }

    return;
  } else {
    const updatedCartItems = cartItems.filter(x => x.product !== id);

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: {
        cartItems: updatedCartItems,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
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
