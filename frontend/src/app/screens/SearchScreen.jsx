import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '@components/Product';
import { listProducts } from '../actions/product.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

const SearchScreen = ({ match }) => {
  const { keyword } = match.params;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, error, loading } = productList;

  React.useEffect(() => {
    /* eslint-disable */
    dispatch(listProducts(keyword));
    return () => {};
  }, [dispatch, keyword]);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Search', isActive: true },
    { name: keyword, isActive: true },
  ];

  return (
    <Container fluid className='px-1 px-sm-0 py-3 '>
      <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
      <br />
      {loading ? (
        <div className='mt-5 '>
          <Loader />
        </div>
      ) : error ? (
        <div className='mt-4'>
          <Message variant='danger'>{error}</Message>
        </div>
      ) : (
        <Row className=' align-items-stretch  '>
          {products.length !== 0 ? (
            <>
              <Col xs={12}>
                <h5>
                  Showing {products.length} items for "{keyword}"
                </h5>
              </Col>
              {products.map(product => {
                /* eslint-disable */
                const id = product._id;
                return (
                  <Col
                    className='mb-3'
                    key={id}
                    xs={6}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={3}
                  >
                    <Product product={product} />
                  </Col>
                );
              })}
            </>
          ) : (
            <Col md={6} className='mx-auto pt-4 text-center '>
              <h1 className=' display-3 text-dark mb-3 '>
                <i className=' fa fa-exclamation-circle '></i>
              </h1>
              <h3>Can't find Product with "{keyword}"</h3>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default SearchScreen;
