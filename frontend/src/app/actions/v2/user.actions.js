import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
} from '@constants/user.constants';
import {
  SESSION_SUCCESS,
  RESET_SESSION,
  LOGOUT_SESSION,
} from '@constants/session.contants';
import { axiosPrivate } from '../../utils/api';

/* eslint-disable */

export const userGetDetailsAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: {
        loading: true,
      },
    });

    const { data } = await axiosPrivate.get(`/users/profile`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        loading: false,
        user: data.user,
      },
    });
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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
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

export const userUpdateProfileAction = ({ ...user }) => async dispatch => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: {
        success: null,
        loading: true,
      },
    });
    const { data } = await axiosPrivate.put(`/users/profile`, {
      email: user.email,
      name: user.name,
    });

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
      type: SESSION_SUCCESS,
      payload: {
        userInfo: data.user,
        status: 'authorized',
      },
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: {
        loading: false,
        user: data.user,
      },
    });
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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
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

export const userResetUpdateProfileFeedBackAction = () => dispatch => {
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
) => async dispatch => {
  try {
    dispatch({
      type: USER_CHANGE_PASSWORD_REQUEST,
    });

    const { data } = await axiosPrivate.put(`/users/profile`, {
      oldPassword: currentPassword,
      newPassword,
    });

    dispatch({
      type: USER_CHANGE_PASSWORD_SUCCESS,
      payload: {
        message: data.message,
        loading: false,
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
    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
    }
    dispatch({
      type: USER_CHANGE_PASSWORD_FAIL,
      payload: {
        message: errData.message,
      },
    });
  }
};

export const userResetChangePasswordFeedBackAction = () => dispatch => {
  dispatch({
    type: USER_CHANGE_PASSWORD_RESET,
  });
};

export const userLogoutAction = () => async (dispatch, getState) => {
  const {
    session: { userInfo },
  } = getState();
  try {
    await axiosPrivate.post(`/users/logout`, {
      session: userInfo.session,
    });

    localStorage.removeItem('cartItems');
    // dispatch({ type: CART_RESET_ITEMS });
    // dispatch({ type: ORDER_USER_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: USER_LIST_RESET });
    dispatch({ type: RESET_SESSION });
    window.location = '/';
  } catch (error) {
    console.log(error);
  }
};
