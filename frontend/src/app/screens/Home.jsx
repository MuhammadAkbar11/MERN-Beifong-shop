import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '@components/Product';
import { listProducts } from '../actions/product.actions';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, error, loading } = productList;

  React.useEffect(() => {
    /* eslint-disable */
    dispatch(listProducts());
    return () => {};
  }, [dispatch]);

  return (
    <>
      {' '}
      <br />
      <br />
      <h1>Latets Products</h1>
      {loading ? (
        <div className='mt-4'>
          <h4 className='text-dark'>Loading...</h4>
        </div>
      ) : error ? (
        <div className='mt-4'>
          <h5 className='text-danger text-capitalize'>{error}</h5>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Home;
