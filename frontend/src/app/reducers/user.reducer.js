import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_RESET,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
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
  USER_UPDATE_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
} from '@constants/user.constants';

const initState = { loading: false };

const userLoginReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...state, loading: false };
    case USER_LOGIN_RESET:
      return initState;
    default:
      return state;
  }
};

const registerInitState = {
  loading: false,
  success: null,
};

const userRegisterReducer = (state = registerInitState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return registerInitState;
    default:
      return state;
  }
};

const userDetailsReducer = (
  state = {
    loading: true,
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
    case USER_DETAILS_RESET:
      return {
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};

const userProfileReducer = (
  state = {
    loading: true,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, ...action.payload };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    case USER_PROFILE_RESET:
      return {
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = { loading: false }, action) => {
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
      return { loading: false, ...action.payload };
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

const userListAlertReducer = (
  state = { type: 'success', message: '', open: false },
  action
) => {
  switch (action.type) {
    case USER_LIST_ALERT_OPEN:
      return { ...action.payload };
    case USER_LIST_ALERT_CLOSE:
      return { type: 'success', message: '', open: false };
    default:
      return state;
  }
};

const userListReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { loading: false, users: [] };
    default:
      return state;
  }
};

const userDeleteReducer = (state = { loading: false, users: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userUpdateReducer = (state = { loading: false, user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { loading: false, user: {} };
    default:
      return state;
  }
};

/* eslint-disable */

export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userChangePasswordReducer,
  userListReducer,
  userListAlertReducer,
  userDeleteReducer,
  userUpdateReducer,
};
