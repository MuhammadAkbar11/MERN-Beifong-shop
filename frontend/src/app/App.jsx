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

const App = () => {
  /* eslint-disable */

  return (
    <>
      <Header />
      <main className='py-3 bg-light '>
        <Container>
          <Switch>
            <Route
              path='/shipping'
              render={props => {
                return <ShippingScreen {...props} />;
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
            <Route path='/' exact component={Home} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
