import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cart.constants';
/* eslint-disable */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const { product } = data;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product._id,
      name: product.name,
      image: `/files/${product.image}`,
      price: product.price,
      countInStock: product.countInStock,
      qty: qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
