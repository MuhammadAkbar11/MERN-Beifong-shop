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
import SearchScreen from './screens/SearchScreen';

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
            <Route path='/admin/userlist' component={AdminUserListScreen} />
            <Route
              path='/admin/productlist'
              component={AdminProductListScreen}
            />
            <Route
              path='/admin/product/:id/edit'
              component={AdminProductEditScreen}
            />
            <Route
              path='/admin/categorylist'
              component={AdminCategoryListScreen}
            />
            <Route
              path='/admin/user/:id/edit'
              component={AdminUserEditScreen}
            />
            <Route path='/admin/orderlist' component={AdminOrderListScreen} />
            <Route path='/search/:keyword' component={SearchScreen} />
            <Route path='/' exact component={Home} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
