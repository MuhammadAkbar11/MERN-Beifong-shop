import { RESET_PAGE_404, SET_PAGE_404 } from '@constants/page.constants';

export const setPageStatus404Action = () => dispatch => {
  dispatch({
    type: SET_PAGE_404,
  });
};

export const resetPageStatus404Action = () => dispatch => {
  dispatch({
    type: RESET_PAGE_404,
  });
};
