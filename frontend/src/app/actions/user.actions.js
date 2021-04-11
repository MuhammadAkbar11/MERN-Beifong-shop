/* eslint-disable */
import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/user.constants';

export const userLoginAction = (email, password) => async dispatch => {
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
      type: USER_LOGIN_FAIL,
      payload: errData,
    });
  }
};

export const userRegisterAction = (
  name,
  email,
  password,
  password2
) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password, password2 },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
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

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errData,
    });
  }
};

export const userLogout = () => dispatch => {
  console.log('logout sir');
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT, userInfo: null });
};
