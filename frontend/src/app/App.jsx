import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from '@app/screens/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  /* eslint-disable */

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route
              path='/product/:id'
              render={props => {
                return <ProductScreen {...props} />;
              }}
            />
          </Switch>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
