/* eslint-disable */
import axios from 'axios';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
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

export const getUserDetailsAction = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: {
        loading: true,
      },
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        loading: false,
        user: data.user,
      },
    });
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
      type: USER_DETAILS_FAIL,
      payload: {
        loading: false,
        error: errData,
      },
    });
  }
};

export const updateUserProfileAction = ({ ...user }) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: {
        success: null,
        loading: true,
      },
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile`,
      { email: user.email, name: user.name },
      config
    );

    const newUserData = {
      token: userInfo.token,
      ...data.user,
    };

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: {
        userInfo: data.user,
        success: {
          message: data.message,
        },
        loading: false,
      },
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: newUserData,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        user: data.user,
      },
    });

    localStorage.setItem('userInfo', JSON.stringify(newUserData));
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
      type: USER_UPDATE_PROFILE_FAIL,
      payload: {
        errors: errData,
        loading: false,
      },
    });
  }
};

export const resetUpdateProfileFeedBackAction = () => dispatch => {
  dispatch({
    type: USER_UPDATE_PROFILE_RESET,
    payload: {
      success: false,
      errors: false,
      loading: false,
    },
  });
};

export const userChangePasswordAction = (
  currentPassword,
  newPassword
) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_CHANGE_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile`,
      { oldPassword: currentPassword, newPassword: newPassword },
      config
    );

    console.log(data);
    dispatch({
      type: USER_CHANGE_PASSWORD_SUCCESS,
      payload: {
        message: data.message,
      },
    });
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
      type: USER_CHANGE_PASSWORD_FAIL,
      payload: {
        message: errData.message,
      },
    });
  }
};

export const resetChangePasswordFeedBackAction = () => dispatch => {
  dispatch({
    type: USER_CHANGE_PASSWORD_RESET,
  });
};