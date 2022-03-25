import { RESET_PAGE_404, SET_PAGE_404 } from '@constants/page.constants';

export const pageStatusReducer = (
  state = { status: null, content: null },
  action
) => {
  switch (action.type) {
    case SET_PAGE_404:
      return { ...state, status: 404 };
    case RESET_PAGE_404:
      return { ...state, status: null };
    default:
      return state;
  }
};
