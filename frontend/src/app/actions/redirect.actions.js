import { PAGE_RESET_REDIRECT } from '../constants/page.constants';
/* eslint-disable */
export const redirectAction = () => dispatch => {
  dispatch({ type: PAGE_RESET_REDIRECT });
};
