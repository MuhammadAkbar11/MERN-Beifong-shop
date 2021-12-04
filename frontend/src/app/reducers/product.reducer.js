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
  PRODUCT_CREATE_REQ,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQ,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQ,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQ,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CATEGORY_REQ,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_RELATED_REQ,
  PRODUCT_RELATED_SUCCESS,
  PRODUCT_RELATED_FAIL,
} from '@constants/product.constants';

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
        ...action.payload,
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

const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQ:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return { loading: false };
    default:
      return state;
  }
};

const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQ:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { loading: false, product: {} };
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

const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQ:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return { loading: false };
    default:
      return state;
  }
};

const productTopListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQ:
      return { loading: true };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productCategoryListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQ:
      return { loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, ...action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const productRelatedListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RELATED_REQ:
      return { loading: true };
    case PRODUCT_RELATED_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_RELATED_FAIL:
      return { loading: false, error: action.payload };
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
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopListReducer,
  productCategoryListReducer,
  productRelatedListReducer,
};
