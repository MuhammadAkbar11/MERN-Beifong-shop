import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from '@app/screens/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderSummarycreen from './screens/OrderSummaryScreen';
import OrderScreen from './screens/OrderScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminCategoryListScreen from './screens/AdminCategoryListScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductListCategory from './screens/ProductListCategory';
import AdminProductDetails from './screens/AdminProductDetails';

const App = () => {
  /* eslint-disable */

  return (
    <>
      <Header />
      <main className='py-3 bg-light '>
        <Container>
          <Switch>
            <Route
              path='/order/:id'
              render={props => {
                return <OrderScreen {...props} />;
              }}
            />
            <Route
              path='/shipping'
              render={props => {
                return <ShippingScreen {...props} />;
              }}
            />
            <Route
              path='/payment'
              render={props => {
                return <PaymentScreen {...props} />;
              }}
            />

            <Route
              path='/summary'
              render={props => {
                return <OrderSummarycreen {...props} />;
              }}
            />
            <Route
              path='/login'
              render={props => {
                return <LoginScreen {...props} />;
              }}
            />
            <Route
              path='/register'
              render={props => {
                return <RegisterScreen {...props} />;
              }}
            />
            <Route
              path='/profile'
              render={props => {
                return <UserProfileScreen {...props} />;
              }}
            />
            <Route
              path='/product/:id'
              render={props => {
                return <ProductScreen {...props} />;
              }}
            />
            <Route
              path='/cart/:productId?'
              render={props => {
                return <CartScreen {...props} />;
              }}
            />
            <Route
              path='/admin/userlist'
              render={props => {
                return <AdminUserListScreen {...props} />;
              }}
            />
            <Route
              path='/admin/productlist'
              render={props => {
                return <AdminProductListScreen {...props} />;
              }}
            />
            <Route
              path='/admin/product/:id/edit'
              render={props => <AdminProductEditScreen {...props} />}
            />
            <Route
              path='/admin/product/:id'
              render={props => <AdminProductDetails {...props} />}
            />
            <Route
              path='/admin/categorylist'
              render={props => <AdminCategoryListScreen {...props} />}
            />
            <Route
              path='/admin/user/:id/edit'
              render={props => {
                return <AdminUserEditScreen {...props} />;
              }}
            />
            <Route
              path='/admin/orderlist'
              render={props => {
                return <AdminOrderListScreen {...props} />;
              }}
            />
            <Route
              path='/search/:keyword/page/:pageNumber'
              exact
              render={props => {
                return <ProductListScreen {...props} />;
              }}
            />
            <Route
              path='/search/:keyword'
              exact
              render={props => {
                return <ProductListScreen {...props} />;
              }}
            />

            <Route
              path='/products/page/:pageNumber'
              exact
              render={props => {
                return <ProductListScreen {...props} />;
              }}
            />
            <Route
              path='/category/:slug/page/:pageNumber'
              exact
              render={props => {
                return <ProductListCategory {...props} />;
              }}
            />
            <Route
              path='/category/:slug'
              exact
              render={props => {
                return <ProductListCategory {...props} />;
              }}
            />
            <Route
              path='/products/'
              render={props => {
                return <ProductListScreen {...props} />;
              }}
            />

            <Route path='/' exact component={Home} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
