/* eslint-disable */
import axios from 'axios';
import { CART_RESET_ITEMS } from '../constants/cart.constants';
import { ORDER_USER_RESET } from '../constants/order.constants';
import { USER_DETAILS_RESET, USER_LOGOUT } from '../constants/user.constants';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const autoLogout = store => next => action => {
  const { dispatch } = store;

  if (userInfoFromStorage) {
    // console.log(userInfoFromStorage, 'storage');
    const { token: userToken } = userInfoFromStorage;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    return axios
      .get(`/api/users/is-auth`, config)
      .then(result => {
        next(action);
      })
      .catch(err => {
        const errData = err?.response?.data || null;
        const { errors } = errData;
        if (errors) {
          if (errors?.notAuth) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('cartItems');
            dispatch({ type: USER_LOGOUT, userInfo: null });
            dispatch({ type: CART_RESET_ITEMS });
            dispatch({ type: ORDER_USER_RESET });
            dispatch({ type: USER_DETAILS_RESET });
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
