/* eslint-disable */
import {
  CATEGORY_ADMIN_ALERT,
  CATEGORY_ADMIN_ALERT_CLOSE,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQ,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQ,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQ,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQ,
  CATEGORY_LIST_SUCCESS,
} from '@constants/category.constants';

export const categoryListAlertReducer = (
  state = { type: 'success', message: '', open: false },
  action
) => {
  switch (action.type) {
    case CATEGORY_ADMIN_ALERT:
      return { ...action.payload };
    case CATEGORY_ADMIN_ALERT_CLOSE:
      return { type: 'success', message: '', open: false };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQ:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQ:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, ...action.payload };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQ:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, ...action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categorytListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQ:
      return {
        loading: true,
        categories: [],
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
