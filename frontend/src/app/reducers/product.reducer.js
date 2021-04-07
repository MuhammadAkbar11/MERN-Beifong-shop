import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCCESS,
} from '../constants/product.constants';

const initState = {
  loading: false,
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

/* eslint-disable */

export { productListReducer };
