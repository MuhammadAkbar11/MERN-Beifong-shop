import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cart.constants';
/* eslint-disable */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const cartData = {
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty: qty,
  };
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      ...cartData,
      product: data._id,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
