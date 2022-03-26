import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import smileySad from '@assets/images/SmileySad.png';
import { Link } from 'react-router-dom';

const ProductNotFound = props => {
  return (
    <>
      <Card body className='border-0 bg-slate-light '>
        <Row className='h-100 '>
          <Col
            xs={12}
            md={5}
            className=' d-flex align-items-center justify-content-center   '
          >
            <img src={smileySad} alt='' />
          </Col>
          <Col
            xs={12}
            md={7}
            className=' d-flex flex-column align-items-center align-items-md-start justify-content-center '
          >
            <h1 className='text-center text-md-left'>
              Oops! Product Not Found
            </h1>
            <p className='text-center text-md-left'>
              We cant seem to find the{' '}
              <span className=' font-weight-bold text-primary '>product</span>{' '}
              you're looking for
            </p>
            <p>
              <Link to='/products' className='btn  btn-primary'>
                Back to Products
              </Link>
            </p>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductNotFound;
