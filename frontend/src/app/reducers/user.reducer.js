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
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_RESET,
} from '../constants/user.constants';

const initState = {};

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
      return { ...state, ...action.payload };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, ...action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { ...action.payload };
    default:
      return state;
  }
};

const userChangePasswordReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case USER_CHANGE_PASSWORD_FAIL:
      return {
        loading: false,
        success: false,
        message: null,
        error: true,
        errorMessage: action.payload.message,
      };
    case USER_CHANGE_PASSWORD_RESET:
      return {
        loading: false,
        success: false,
        message: null,
        error: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

/* eslint-disable */

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userChangePasswordReducer,
};
