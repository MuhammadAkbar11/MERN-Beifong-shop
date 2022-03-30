import React from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import {
  resetPageStatus404Action,
  setPageStatus404Action,
} from '@actions/page.actions';

import { Link } from 'react-router-dom';
import smileySad from '@assets/images/SmileySad.png';

const NotFoundScreen = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPageStatus404Action());

    return () => {
      dispatch(resetPageStatus404Action());
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Beifong Shop | 404</title>
      </Helmet>

      <Jumbotron className='h-100'>
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
            className=' d-flex flex-column align-items-start justify-content-center'
          >
            <h1>Oops! Page Not Found</h1>
            {/* prettier-ignore */}
            {/* eslint-disable */}
            <p>We Cant Seem to find the page you're looking for</p>{' '}
            <p>
              <Link to='/' className='btn btn-primary'>
                Back Home
              </Link>
            </p>
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
};

export default NotFoundScreen;
