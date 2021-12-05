import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryListAlertReducer,
  categorytListReducer,
  categoryUpdateReducer,
} from '@reducers/category.reducer';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListAlertReducer,
  productListReducer,
  productRelatedListReducer,
  productReviewCreateReducer,
  productTopListReducer,
  productUpdateReducer,
} from '@reducers/product.reducer';
import { cartReducer } from '@reducers/cart.reducer';
import {
  userChangePasswordReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListAlertReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from '@reducers/user.reducer';
import {
  myOrderReducer,
  orderConfirmDeliverReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderListAlertReducer,
  orderListReducer,
  orderPayReducer,
} from '@reducers/order.reducer';
import autoLogout from './middleware/autologout';

const reducer = combineReducers({
  productsAlert: productListAlertReducer,
  productList: productListReducer,
  productTopList: productTopListReducer,
  productRelatedList: productRelatedListReducer,
  productCategoryList: productCategoryListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productRewiewCreate: productReviewCreateReducer,
  categoryList: categorytListReducer,
  categoryAlert: categoryListAlertReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userChangePassword: userChangePasswordReducer,
  userList: userListReducer,
  userListAlert: userListAlertReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrderReducer,
  orderListAlert: orderListAlertReducer,
  orderList: orderListReducer,
  orderConfirmDeliver: orderConfirmDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk, autoLogout];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
