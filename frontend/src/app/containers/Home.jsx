import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          {' '}
          <h1>Beifong</h1>
          <Button variant='primary'>Shop now</Button>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Home;
