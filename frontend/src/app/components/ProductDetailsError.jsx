import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import smileySad from '@assets/images/SmileySad.png';
import { Link } from 'react-router-dom';

const ProductDetailsError = () => {
  return (
    <>
      <Card body className='border-0 bg-slate-light'>
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
            className=' d-flex flex-column align-items-center align-items-md-start justify-content-center'
          >
            <h1 className='text-center text-md-left'>
              Oops! something went wrong
            </h1>
            <p className='text-center text-md-left'>
              we are working fixing the problem. please try again
            </p>
            <div className='d-flex align-items-center flex-wrap '>
              <Button onClick={() => window.location.reload()}>
                {' '}
                <i className='fa fa-redo mr-2 ' /> Refresh
              </Button>
              <p className='mx-2 my-0'>Or</p>
              <Link to='/products' className='btn  btn-outline-primary'>
                Contact Us
              </Link>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductDetailsError;
