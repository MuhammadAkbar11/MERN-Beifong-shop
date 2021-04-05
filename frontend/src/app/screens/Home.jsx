import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '@components/Product';
import products from '../../../public/products';

const Home = () => {
  return (
    <>
      {' '}
      <br />
      <br />
      <h1>Latets Products</h1>
      <Row className=' align-items-stretch '>
        {products.map(product => {
          /* eslint-disable */
          const id = product._id;
          return (
            <Col className='mb-3' key={id} xs={6} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
