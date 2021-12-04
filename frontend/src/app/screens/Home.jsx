import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Product from '@components/Product';
import { listProducts } from '../actions/product.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, error, loading } = productList;

  React.useEffect(() => {
    /* eslint-disable */
    dispatch(listProducts({ result: 8 }));
    return () => {};
  }, [dispatch]);

  return (
    <>
      {' '}
      <Helmet>
        <title>Welcome to Beifong Shop | Home</title>
      </Helmet>
      <section className='mb-3'>
        <ProductCarousel />
      </section>
      <br />
      <br />
      <h1>Latets Products</h1>
      {loading ? (
        <div className='mt-5 '>
          <Loader />
        </div>
      ) : error ? (
        <div className='mt-4'>
          <Message variant='danger'>{error}</Message>
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
