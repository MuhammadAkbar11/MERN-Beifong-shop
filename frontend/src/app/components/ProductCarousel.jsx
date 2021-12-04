import React from 'react';
import { Alert, Carousel, Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { topListProductAction } from '@actions/product.actions';
import Loader from './Loader';
/* eslint-disable */
const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(
    state => state.productTopList
  );

  React.useEffect(() => {
    dispatch(topListProductAction({ limit: 3 }));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className='d-flex w-100 justify-content-center'>
          <Loader />
        </div>
      ) : error ? (
        <Alert variant='danger'>{error?.message}</Alert>
      ) : (
        <Carousel pause='hover' className='bg-slate mt-3'>
          {products.map(product => {
            return (
              <Carousel.Item key={product._id}>
                <Row className=' h-100'>
                  <Col
                    xs={12}
                    md={6}
                    className='h-100 carousel-image-col d-flex justify-content-center align-items-center '
                  >
                    <Image
                      className=' w-auto '
                      src={product.image}
                      alt={product.name}
                    />
                  </Col>
                  <Col
                    xs={12}
                    md={6}
                    className='  carousel-content-col d-flex flex-wrap flex-column align-items-center align-items-md-start align-content-start  justify-content-start justify-content-md-center px-5 pl-md-0 pr-md-3'
                  >
                    <h4 className=' mb-2 text-dark text-center text-md-left '>
                      {product.name} ({product.price?.num})
                    </h4>
                    <p className='text-center text-md-left'>
                      {product?.description}
                    </p>
                    <div>
                      {' '}
                      <Link
                        className='btn btn-primary'
                        to={`/product/${product._id}`}
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
