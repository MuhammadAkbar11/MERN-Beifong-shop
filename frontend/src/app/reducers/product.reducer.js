import {
  PRODUCT_ADMIN_ALERT,
  PRODUCT_ADMIN_ALERT_CLOSE,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQ,
  PRODUCT_DELETE_SUCCESS,
} from '../constants/product.constants';

const initState = {
  loading: true,
  products: [],
};

const productListReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQ:
      return {
        loading: true,
        products: [],
      };

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const detailInitState = {
  product: {
    reviews: [],
  },
  loading: true,
};

const productDetailsReducer = (state = detailInitState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQ:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQ:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productListAlertReducer = (
  state = { type: 'success', message: '', open: false },
  action
) => {
  switch (action.type) {
    case PRODUCT_ADMIN_ALERT:
      return { ...action.payload };
    case PRODUCT_ADMIN_ALERT_CLOSE:
      return { type: 'success', message: '', open: false };
    default:
      return state;
  }
};

/* eslint-disable */

export {
  productListAlertReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
};
