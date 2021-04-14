import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

const defaultProps = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

const proptypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const activeClass = 'font-weight-bold text-primary ';
  return (
    <Nav className=' justify-content-center mb-5 mt-3 '>
      <Nav.Item className='mr-1'>
        {step1 ? (
          <LinkContainer to='/login' className={activeClass}>
            <Nav.Link>
              Sign in <i className='fa fa-check-circle ml-1' />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='mr-1'>
        {step2 ? (
          <LinkContainer to='/shipping' className={activeClass}>
            <Nav.Link>
              Shipping{' '}
              {step2 && step3 && <i className='fa fa-check-circle ml-1' />}
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='mr-1'>
        {step3 ? (
          <LinkContainer to='/payment' className={activeClass}>
            <Nav.Link>
              Payment{' '}
              {step3 && step4 && <i className='fa fa-check-circle ml-1' />}
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item className='mr-1'>
        {step4 ? (
          <LinkContainer to='/placeorder' className={activeClass}>
            <Nav.Link>
              Place Order <i className='fa fa-check-circle ml-1' />
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

CheckoutSteps.defaultProps = defaultProps;

CheckoutSteps.propTypes = proptypes;

export default CheckoutSteps;
