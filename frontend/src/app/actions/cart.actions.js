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
} from '@constants/cart.constants';
import { PAGE_REDIRECT } from '@constants/page.constants';
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
        image: `${product.image}`,
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
          image: `${item.product.image}`,
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
    }, 500);
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

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM_REQ,
  });

  const {
    userLogin: { userInfo },
    cart: { cartItems },
  } = getState();

  if (userInfo) {
    try {
      let updatedCartItems = cartItems;
      const userToken = userInfo.token;
      const removeCartItem = await axios.post(
        `/api/users/cart/delete`,
        { product: id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

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

      setTimeout(() => {
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
      }, 500);
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

      setTimeout(() => {
        dispatch({
          type: CART_REMOVE_ITEM_FAIL,
          payload: errData,
        });
      }, 500);
    }

    return;
  } else {
    const updatedCartItems = cartItems.filter(x => x.product !== id);
    setTimeout(() => {
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
    }, 500);
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
