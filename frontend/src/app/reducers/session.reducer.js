import {
  SESSION_FAIL,
  SESSION_REQ,
  RESET_SESSION,
  SESSION_SUCCESS,
} from '@constants/session.contants';

export const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_REQ:
      return { loading: true };
    case SESSION_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case SESSION_FAIL:
      return { loading: false, error: action.payload };
    case RESET_SESSION:
      return { ...state, loading: false, userInfo: action.payload };
    default:
      return state;
  }
};
