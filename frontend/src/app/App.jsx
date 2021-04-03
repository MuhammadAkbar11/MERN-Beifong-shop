import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from '@app/screens/Home';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
  /* eslint-disable */

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
