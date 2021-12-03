import axios from 'axios';
import {
  PRODUCT_ADMIN_ALERT,
  PRODUCT_ADMIN_ALERT_CLOSE,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQ,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQ,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQ,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQ,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/product.constants';

/* eslint-disable */
export const listProducts = ({
  keyword = '',
  pageNumber = '',
  result = 5,
}) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQ });

    const queries = {
      keyword: keyword,
      pageNumber: pageNumber,
      result: result,
    };

    const queriesToString = Object.keys(queries)
      .map(key => `${key}=${queries[key]}`)
      .join('&');

    const { data } = await axios.get(`/api/products?${queriesToString}`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {
        products: data.products,
        page: data?.page || null,
        pages: data?.pages || null,
      },
    });
  } catch (error) {
    console.log(error);

    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      errData = {
        message: error.response.data.message,
      };
    }

    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: errData.message,
    });
  }
};

export const resetProductListAlertAction = () => async dispatch => {
  dispatch({ type: PRODUCT_ADMIN_ALERT_CLOSE });
};

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQ });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    let errData = {
      message: error.message,
    };

    if (error.response && error.response.data.message) {
      errData = {
        message: error.response.data.message,
      };
    }

    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: errData,
    });
  }
};

export const deleteProductAction = productID => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: PRODUCT_DELETE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${productID}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });

    dispatch({
      type: PRODUCT_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message: data?.message,
      },
    });
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

    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: {
        errors: errData,
        loading: false,
      },
    });

    dispatch({
      type: PRODUCT_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message:
          errData?.message ||
          errData?.errors?.message ||
          'Failed to delete category',
      },
    });

    throw errData;
  }
};

export const createProductAction = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: PRODUCT_CREATE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });

    return data.product;
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

    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: errData,
    });

    throw errData;
  }
};

export const updateProductAction = product => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: PRODUCT_UPDATE_REQ,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const postData = {
      name: product.name,
      price: product.price,
      image: product.image,
      oldImage: product.oldImage,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
    };

    if (product.uploading) {
      const uploadConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const file = product.uploading?.file;
      const formData = new FormData();
      formData.append('filename', 'product-' + product._id);
      formData.append('image', file);
      const { data: uploadedImage } = await axios.post(
        '/api/upload',
        formData,
        uploadConfig
      );

      postData.image = uploadedImage;
      postData.uploading = true;
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      postData,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: {},
    });
    dispatch({
      type: PRODUCT_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message: data?.message,
      },
    });
    return data.product;
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

    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: errData,
    });

    throw errData;
  }
};

export const createProductReviewAction = product => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/products/${product._id}/reviews`,
      { ...product },
      config
    );

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });

    return data;
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

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: errData,
    });

    throw errData;
  }
};
