import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Product from '@components/Product';
import { listProducts } from '@actions/product.actions';
import Loader from '@components/Loader';
import Message from '@components/Message';
import ProductCarousel from '@components/ProductCarousel';
import { Link } from 'react-router-dom';

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
      <div className=' d-flex flex-column flex-sm-row  justify-content-between align-items-sm-center '>
        <h1>Latets Products</h1>
        <Link to={'/products'} className=''>
          see more{' '}
          <small>
            <i className='fa fa-arrow-right '></i>
          </small>
        </Link>
      </div>
      {loading ? (
        <div className='mt-5 mb-5 '>
          <Loader />
        </div>
      ) : error ? (
        <div className='mt-4'>
          <Message variant='danger'>{error}</Message>
        </div>
      ) : (
        <Row className=' align-items-stretch mb-4 '>
          {products &&
            products.map(product => {
              /* eslint-disable */
              const id = product._id;
              return (
                <Col
                  className='mb-3'
                  key={id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                >
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
