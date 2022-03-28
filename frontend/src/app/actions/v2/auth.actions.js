import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '@constants/user.constants';
import axiosApi from '@utils/api';
import { SESSION_SUCCESS } from '@constants/session.contants';

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
    // const userCart = data.user.cart;
    // const userToken = data.user.token;

    // const userCartItems = cartItems.map(cart => {
    //   return {
    //     product: cart.product,
    //     qty: cart.qty,
    //     subtotal: cart.qty * cart.price.num,
    //   };
    // });

    // if (userCart.items.length === 0) {
    //   if (cartItems.length !== 0) {
    //     const insertNewCartItems = await axios.post(
    //       `/api/users/cart`,
    //       { cartItems: userCartItems },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${userToken}`,
    //         },
    //       }
    //     );
    //     data.user.cart = insertNewCartItems.data.cart;
    //   }
    // } else {
    //   if (cartItems.length !== 0) {
    //     const updateCartItems = await axios.post(
    //       `/api/users/cart`,
    //       { cartItems: userCartItems },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${userToken}`,
    //         },
    //       }
    //     );

    //     data.user.cart = updateCartItems.data.cart;
    //   }
    // }

    const updatedUserCart = data.user.cart;

    // const transformCart = updatedUserCart.items.map(item => {
    //   return {
    //     product: item.product._id,
    //     name: item.product.name,
    //     price: item.product.price,
    //     image: item.product.image,
    //     countInStock: item.product.countInStock,
    //     subtotal: item.subtotal,
    //     qty: item.qty,
    //   };
    // });

    // dispatch({
    //   type: CART_USER_LOAD,
    //   payload: {
    //     cartItems: transformCart,
    //   },
    // });

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
