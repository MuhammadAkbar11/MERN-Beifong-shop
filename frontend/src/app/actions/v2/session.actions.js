import {
  SESSION_FAIL,
  SESSION_REQ,
  SESSION_SUCCESS,
} from '@constants/session.contants';
import { axiosPrivate } from '@utils/api';
import { loadUserSessionCartAction } from '@actions/cart.actions';
/* eslint-disable */
export const getSessionAction = () => async dispatch => {
  try {
    dispatch({
      type: SESSION_REQ,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const {
      data: { status, user },
    } = await axiosPrivate.get(`/session`, config);

    setTimeout(() => {
      if (status) {
        const userInfo = user;
        delete userInfo.cart;
        dispatch({
          type: SESSION_SUCCESS,
          payload: {
            userInfo: userInfo,
            status: 'authorized',
          },
        });
        loadUserSessionCartAction(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        dispatch({
          type: SESSION_SUCCESS,
          payload: {
            userInfo: null,
            status: 'unauthorized',
          },
        });
      }
    }, 100);
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
      type: SESSION_FAIL,
      payload: {
        loading: false,
        error: errData,
      },
    });
  }
};
