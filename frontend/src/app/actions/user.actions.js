/* eslint-disable */
import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/user.constants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    console.log(error, 'error login');

    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      errData = {
        message: error.response.data.message,
        errors: error.errors ? error.errors : null,
      };
    }

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errData,
    });
  }
};
