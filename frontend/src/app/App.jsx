import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Home from '@app/screens/Home';
import Footer from '@components/Footer';
import Header from '@components/Header';
import ProductScreen from '@screens/ProductScreen';
import CartScreen from '@screens/CartScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import UserProfileScreen from '@screens/UserProfileScreen';
import ShippingScreen from '@screens/ShippingScreen';
import PaymentScreen from '@screens/PaymentScreen';
import OrderSummarycreen from '@screens/OrderSummaryScreen';
import OrderScreen from '@screens/OrderScreen';
import AdminUserListScreen from '@screens/AdminUserListScreen';
import AdminUserEditScreen from '@screens/AdminUserEditScreen';
import AdminProductListScreen from '@screens/AdminProductListScreen';
import AdminCategoryListScreen from '@screens/AdminCategoryListScreen';
import AdminProductEditScreen from '@screens/AdminProductEditScreen';
import AdminOrderListScreen from '@screens/AdminOrderListScreen';
import ProductListScreen from '@screens/ProductListScreen';
import ProductListCategory from '@screens/ProductListCategory';
import AdminProductDetails from '@screens/AdminProductDetails';
import AdminDetailsOrderScreen from '@screens/AdminDetailsOrderScreen';

import NotFoundScreen from '@screens/NotFoundScreen';
import RouteGuest from '@components/RouteGuest';
import RoutePrivate from '@components/RoutePrivate';

const App = () => {
  /* eslint-disable */

  const { status: pageStatus } = useSelector(state => state.pageStatus);

  return (
    <>
      {!pageStatus && <Header />}
      <main className='py-3 bg-light wrapper  '>
        <Container className=''>
          <Switch>
            <RoutePrivate path='/order/:id' component={OrderScreen} />
            <RoutePrivate path='/shipping' component={ShippingScreen} />
            <RoutePrivate path='/payment' component={PaymentScreen} />
            <RoutePrivate path='/summary' component={OrderSummarycreen} />

            <RouteGuest
              path='/login'
              restricted={true}
              component={LoginScreen}
            />

            <RouteGuest
              path='/register'
              restricted={true}
              component={RegisterScreen}
            />
            <RoutePrivate path='/profile' component={UserProfileScreen} />
            <RouteGuest path='/product/:id' component={ProductScreen} />
            <RouteGuest path='/cart/:productId?' component={CartScreen} />
            <RoutePrivate
              path='/admin/userlist'
              component={AdminUserListScreen}
            />
            <RoutePrivate
              path='/admin/productlist'
              component={AdminProductListScreen}
            />
            <RoutePrivate
              path='/admin/product/:id/edit'
              component={AdminProductEditScreen}
            />
            <RoutePrivate
              path='/admin/product/:id'
              component={AdminProductDetails}
            />
            <RoutePrivate
              path='/admin/categorylist'
              component={AdminCategoryListScreen}
            />
            <RoutePrivate
              path='/admin/user/:id/edit'
              component={AdminUserEditScreen}
            />
            <Route
              path='/admin/order/:id'
              render={props => {
                return <AdminDetailsOrderScreen {...props} />;
              }}
            />

            <RoutePrivate
              path='/admin/orderlist'
              component={AdminOrderListScreen}
            />

            <RouteGuest
              path='/search/:keyword/page/:pageNumber'
              exact
              component={ProductListScreen}
            />
            <RouteGuest
              path='/search/:keyword'
              exact
              component={ProductListScreen}
            />
            <RouteGuest
              path='/products/page/:pageNumber'
              exact
              component={ProductListScreen}
            />
            <RouteGuest
              path='/category/:slug/page/:pageNumber'
              exact
              component={ProductListCategory}
            />

            <RouteGuest
              path='/category/:slug'
              exact
              component={ProductListCategory}
            />

            <RouteGuest path='/products/' component={ProductListScreen} />
            <RouteGuest path='/' exact component={Home} />

            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>

      {!pageStatus && <Footer />}
    </>
  );
};

export default App;
