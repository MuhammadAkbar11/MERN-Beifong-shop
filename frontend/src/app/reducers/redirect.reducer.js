import {
  PAGE_RESET_REDIRECT,
  PAGE_REDIRECT,
} from '../constants/page.constants';

/* eslint-disable */

export const redirectReducer = (state = {}, action) => {
  switch (action.type) {
    case PAGE_REDIRECT:
      return {
        redirectTo: action.payload,
      };
    case PAGE_RESET_REDIRECT:
      return {};
    default:
      return state;
  }
};
