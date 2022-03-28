import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from '@constants/user.constants';
import { axiosPrivate } from '../../utils/api';

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
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      withCredentials: true,
    };

    const { data } = await axiosPrivate.get(`/users/${id}`, config);
    console.log(data);
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
