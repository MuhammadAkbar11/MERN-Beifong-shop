import axios from 'axios';
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

/* eslint-disable */
export const listCategoriesAction = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_LIST_REQ });
    const { data } = await axios.get('/api/categories');
    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data.categories,
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
      type: CATEGORY_LIST_FAIL,
      payload: errData.message,
    });
  }
};

export const resetListCategoryAlertAction = () => async dispatch => {
  dispatch({ type: CATEGORY_ADMIN_ALERT_CLOSE });
};

export const deleteCategoryAction = categoryID => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: CATEGORY_DELETE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/categories/${categoryID}`,
      config
    );

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
    });

    dispatch({
      type: CATEGORY_ADMIN_ALERT,
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
      type: CATEGORY_DELETE_FAIL,
      payload: errData,
    });

    dispatch({
      type: CATEGORY_ADMIN_ALERT,
      payload: {
        open: true,
        type: 'success',
        message:
          errData?.message ||
          errData?.errors?.message ||
          'Failed to delete category',
      },
    });
  }
};

export const createCategoryAction = ({ name, slug, icon }) => async (
  dispatch,
  getState
) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: CATEGORY_CREATE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/categories`,
      { name, slug, icon },
      config
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: {
        category: data.category,
      },
    });

    dispatch({
      type: CATEGORY_ADMIN_ALERT,
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
      type: CATEGORY_CREATE_FAIL,
      payload: errData,
    });

    // dispatch({
    //   type: CATEGORY_ADMIN_ALERT,
    //   payload: {
    //     open: true,
    //     type: 'success',
    //     message:
    //       errData?.message ||
    //       errData?.errors?.message ||
    //       'Failed to create category',
    //   },
    // });
    throw errData;
  }
};

export const updateCategoryAction = ({
  categoryID,
  name,
  slug,
  icon,
}) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({
      type: CATEGORY_UPDATE_REQ,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/categories/${categoryID}`,
      { name, slug, icon },
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: {
        category: data.category,
      },
    });

    dispatch({
      type: CATEGORY_ADMIN_ALERT,
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
      type: CATEGORY_UPDATE_FAIL,
      payload: errData,
    });

    throw errData;
    // dispatch({
    //   type: CATEGORY_ADMIN_ALERT,
    //   payload: {
    //     open: true,
    //     type: 'success',
    //     message:
    //       errData?.message ||
    //       errData?.errors?.message ||
    //       'Failed to update category',
    //   },
    // });
  }
};
