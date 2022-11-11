import {
  PRODUCT_ADMIN_ALERT,
  PRODUCT_ADMIN_ALERT_CLOSE,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQ,
  PRODUCT_CATEGORY_SUCCESS,
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
  PRODUCT_RELATED_FAIL,
  PRODUCT_RELATED_REQ,
  PRODUCT_RELATED_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQ,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQ,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DETAILS_RESET,
} from '@constants/product.constants';
import { LOGOUT_SESSION } from '@constants/session.contants';
import queriesToString from '@utils/queriesToString';
import axiosApi, { axiosPrivate } from '@utils/api';

/* eslint-disable */
export const listProducts = ({
  keyword = '',
  pageNumber = '',
  result = 5,
  orderBy = 'name',
}) => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQ });

    const queries = {
      keyword: keyword,
      pageNumber: pageNumber,
      result: result,
      orderBy: orderBy,
    };

    const queriesString = queriesToString(queries);

    const { data } = await axiosApi.get(`/products?${queriesString}`);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {
        products: data.products,
        page: data?.page || null,
        pages: data?.pages || null,
      },
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
    const { data } = await axiosApi.get(`/products/${id}`);

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

export const resetProductDetailsAction = () => dispatch => {
  dispatch({ type: PRODUCT_DETAILS_RESET });
};

export const deleteProductAction = productID => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQ,
    });

    const { data } = await axiosPrivate.delete(`/products/${productID}`);

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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
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

export const createProductAction = () => async dispatch => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQ,
    });

    const { data } = await axiosPrivate.post(`/products`, {});

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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
    }

    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: errData,
    });

    throw errData;
  }
};

export const updateProductAction = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQ,
    });

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
        },
        withCredentials: true,
      };
      const file = product.uploading?.file;
      const formData = new FormData();
      formData.append('filename', 'product-' + product._id);
      formData.append('image', file);
      const { data: uploadedImage } = await axiosPrivate.post(
        '/upload',
        formData,
        uploadConfig
      );

      postData.image = uploadedImage;
      postData.uploading = true;
    }

    const { data } = await axiosPrivate.put(
      `/products/${product._id}`,
      postData
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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
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
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQ,
    });

    const { data } = await axiosPrivate.post(
      `/products/${product._id}/reviews`,
      { ...product }
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

    if (error.response.data?.errors?.notAuth) {
      dispatch({
        type: LOGOUT_SESSION,
        payload: {
          isLogout: true,
        },
      });
    }

    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: errData,
    });

    throw errData;
  }
};

export const topListProductAction = ({ limit }) => async dispatch => {
  dispatch({ type: PRODUCT_TOP_REQ });

  try {
    const { data } = await axiosApi.get(`/products/top?limit=${limit}`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data.products,
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
      type: PRODUCT_TOP_FAIL,
      payload: errData,
    });
  }
};

export const relatedListProductAction = ({
  limit,
  prodID,
}) => async dispatch => {
  dispatch({ type: PRODUCT_RELATED_REQ });

  try {
    const { data } = await axiosApi.get(
      `/products/${prodID}/related?limit=${limit}`
    );

    dispatch({
      type: PRODUCT_RELATED_SUCCESS,
      payload: data.products,
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
      type: PRODUCT_RELATED_FAIL,
      payload: errData,
    });
  }
};

export const listProductByCategoryAction = ({
  limit = 10,
  pageNumber = 1,
  slug,
}) => async dispatch => {
  dispatch({ type: PRODUCT_CATEGORY_REQ });

  try {
    const queries = {
      pageNumber: pageNumber,
      limit: limit,
    };

    const queriesString = queriesToString(queries);

    const { data } = await axiosApi.get(
      `/products/category/${slug}?${queriesString}`
    );

    dispatch({
      type: PRODUCT_CATEGORY_SUCCESS,
      payload: data,
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
      type: PRODUCT_CATEGORY_FAIL,
      payload: errData,
    });
  }
};
