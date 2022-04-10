import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '@constants/user.constants';
import axiosApi from '@utils/api';
import { SESSION_SUCCESS } from '@constants/session.contants';
import { CART_USER_LOAD } from '@constants/cart.constants';
import { axiosPrivate } from '../../utils/api';

export const authUserLoginAction = (email, password) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const {
      cart: { cartItems },
    } = getState();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const { data } = await axiosApi.post(
      '/users/login',
      JSON.stringify({ email, password }),
      config
    );
    const userCart = data.user.cart;

    const userCartItems = cartItems.map(cart => {
      return {
        product: cart.product,
        qty: cart.qty,
        subtotal: cart.qty * cart.price.num,
      };
    });
    console.log(userCart);
    if (userCart.items.length === 0) {
      if (cartItems.length !== 0) {
        const insertNewCartItems = await axiosPrivate.post(`/users/cart`, {
          cartItems: userCartItems,
        });
        data.user.cart = insertNewCartItems.data.cart;
      }
    } else if (cartItems.length !== 0) {
      const updateCartItems = await axiosPrivate.post(`/users/cart`, {
        cartItems: userCartItems,
      });

      data.user.cart = updateCartItems.data.cart;
    }

    const updatedUserCart = data.user.cart;

    const transformCart = updatedUserCart.items.map(item => {
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

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: null,
    });
    dispatch({
      type: SESSION_SUCCESS,
      payload: {
        userInfo: data.user,
        status: 'authorized',
      },
    });
    dispatch({
      type: CART_USER_LOAD,
      payload: {
        cartItems: transformCart,
      },
    });
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
    return true;
  } catch (error) {
    let errData = {
      message: error.message,
    };
    console.log(error);
    if (error.response && error.response.data.message) {
      const errorData =
        error.response.data.errors && error.response.data.errors;
      errData = {
        message: error.response.data.message,
        ...errorData,
      };
    }

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errData,
    });

    throw new Error(errData);
  }
};
