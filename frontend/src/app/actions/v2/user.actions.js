import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_LIST_ALERT_OPEN,
  USER_LIST_ALERT_CLOSE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '@constants/user.constants';
import {
  SESSION_SUCCESS,
  RESET_SESSION,
  LOGOUT_SESSION,
} from '@constants/session.contants';
import { CART_RESET_ITEMS } from '@constants/cart.constants';
import { ORDER_USER_RESET } from '@constants/order.constants';
import { axiosPrivate } from '@utils/api';

/* eslint-disable */

export const userGetProfileAction = () => async dispatch => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
      payload: {
        loading: true,
      },
    });

    const { data } = await axiosPrivate.get(`/users/profile`);

    dispatch({
      type: USER_PROFILE_SUCCESS,
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
      type: USER_PROFILE_FAIL,
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
      },
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: {
        loading: false,
        user: data.user,
      },
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
    localStorage.removeItem('userInfo');
    dispatch({ type: CART_RESET_ITEMS });
    dispatch({ type: ORDER_USER_RESET });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: RESET_SESSION });
    window.location = '/';
  } catch (error) {
    if (error.response.data?.errors?.notAuth) {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('userInfo');
      dispatch({ type: CART_RESET_ITEMS });
      dispatch({ type: ORDER_USER_RESET });
      dispatch({ type: USER_PROFILE_RESET });
      dispatch({ type: USER_LIST_RESET });
      dispatch({ type: RESET_SESSION });
      window.location = '/';
    }
  }
};

export const resetUserListAlertAction = () => async dispatch => {
  dispatch({ type: USER_LIST_ALERT_CLOSE });
};

export const getUserListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
      payload: {
        success: null,
        loading: true,
      },
    });

    const { data } = await axiosPrivate.get(`/users`);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.users,
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
      type: USER_LIST_FAIL,
      payload: {
        errors: errData,
        loading: false,
      },
    });
  }
};

export const getUserDetailsAction = id => async dispatch => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
      payload: {
        loading: true,
      },
    });

    const { data } = await axiosPrivate.get(`/users/${id}`);

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

export const deleteUserAction = userId => async dispatch => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const { data } = await axiosPrivate.delete(`/users/${userId}`);

    // setTimeout(() => {
    dispatch({
      type: USER_DELETE_SUCCESS,
    });

    dispatch({
      type: USER_LIST_ALERT_OPEN,
      payload: {
        open: true,
        type: 'success',
        message: data?.message,
      },
    });
    // }, 2000);
  } catch (error) {
    console.log(error);
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData = error.response.data?.errors;
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
      type: USER_DELETE_FAIL,
      payload: {
        errors: errData,
        loading: false,
      },
    });

    dispatch({
      type: USER_LIST_ALERT_OPEN,
      payload: {
        open: true,
        type: 'success',
        message:
          errData?.message ||
          errData?.errors?.message ||
          'Failed to delete user',
      },
    });
  }
};

export const updateUserAction = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const { data } = await axiosPrivate.put(`/users/${user._id}`, user);

    // setTimeout(() => {
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: { user: data?.user },
    });

    dispatch({
      type: USER_LIST_ALERT_OPEN,
      payload: {
        open: true,
        type: 'success',
        message: data?.message,
      },
    });
    // }, 2000);
    return { redirect: true };
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      const errorData = error.response.data?.errors;
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
      type: USER_UPDATE_FAIL,
      payload: errData,
    });
    throw errData;
    //
  }
};

export const userUploadPictureAction = values => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    };

    const file = values.uploading?.file;
    const formData = new FormData();
    formData.append('filename', 'user-' + values._id);
    formData.append('image', file);

    const { data: uploadedPhoto } = await axiosPrivate.post(
      '/upload',
      formData,
      config
    );

    const configUserUpload = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const { data } = await axiosPrivate.post(
      `/users/upload-photo/${values._id}`,
      { image: uploadedPhoto, oldImage: values.oldImage },
      configUserUpload
    );

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
      },
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: {
        loading: false,
        user: data.user,
      },
    });

    localStorage.setItem('userInfo', JSON.stringify(data.user));
    return { message: data.message };
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

    throw errData;
  }
};
