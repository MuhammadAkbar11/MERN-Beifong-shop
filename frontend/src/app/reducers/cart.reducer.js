/* eslint-disable */
import { CART_ADD_ITEM } from '../constants/cart.constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      const { cartItems } = state;
      if (existItem) {
        return {
          ...state,
          cartItems: cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      }
      return {
        ...state,
        cartItems: [...cartItems, item],
      };

      return;

    default:
      return state;
  }
};
