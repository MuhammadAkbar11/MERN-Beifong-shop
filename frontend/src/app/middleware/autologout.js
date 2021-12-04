/* eslint-disable */
import axios from 'axios';
import { CART_RESET_ITEMS } from '@constants/cart.constants';
import { ORDER_USER_RESET } from '@constants/order.constants';
import {
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_LOGOUT,
} from '@constants/user.constants';

const autoLogout = store => next => action => {
  const { dispatch, getState } = store;
  const { userInfo, loading } = getState().userLogin;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_LOGOUT, userInfo: null });
    dispatch({ type: CART_RESET_ITEMS });
    dispatch({ type: ORDER_USER_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });

    window.location.href = '/';
  };

  if (userInfo) {
    const { token: userToken } = userInfo;
    if (!userToken) {
      handleLogout();
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    return axios
      .get(`/api/users/is-auth`, config)
      .then(res => {
        next(action);
      })
      .catch(err => {
        const errData = err?.response?.data || {};
        const { errors } = errData;
        if (errors) {
          if (errors?.notAuth) {
            handleLogout();

            return;
          }
          next(action);
        } else {
          next(action);
        }
      });
  } else {
    next(action);
  }
};

export default autoLogout;
