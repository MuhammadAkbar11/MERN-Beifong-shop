import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/user.constants';

const initState = {
  loading: false,
};

const userLoginReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

const registerInitState = {
  loading: false,
};

const userRegisterReducer = (state = registerInitState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userDetailsReducer = (
  state = {
    loading: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

/* eslint-disable */

export { userLoginReducer, userRegisterReducer, userDetailsReducer };
