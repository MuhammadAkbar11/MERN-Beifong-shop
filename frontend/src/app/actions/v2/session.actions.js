import {
  SESSION_FAIL,
  SESSION_REQ,
  RESET_SESSION,
  SESSION_SUCCESS,
} from '@constants/session.contants';
import { axiosPrivate } from '../../utils/api';

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
        dispatch({
          type: SESSION_SUCCESS,
          payload: user,
        });
      } else {
        dispatch({
          type: SESSION_SUCCESS,
          payload: null,
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
      type: USER_DETAILS_FAIL,
      payload: {
        loading: false,
        error: errData,
      },
    });
  }
};
