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
  currentStep: PropTypes.string.isRequired,
};

const CheckoutSteps = ({ step1, step2, step3, step4, currentStep }) => {
  const navLinkActiveClass = 'font-weight-bold text-primary ';
  return (
    <Nav className=' justify-content-center step-nav '>
      <Nav.Item
        className={`step-nav-item px-2 ${
          currentStep === 'step1' ? 'step-active' : ''
        } ${step1 && step2 && 'prev-step'} `}
      >
        {step1 ? (
          <LinkContainer to='/login' className={navLinkActiveClass}>
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item
        className={`step-nav-item px-2 ${
          currentStep === 'step2' ? 'step-active' : ''
        } ${step2 && step3 && 'prev-step'}`}
      >
        {step2 ? (
          <LinkContainer to='/shipping' className={navLinkActiveClass}>
            <Nav.Link>Shipping </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item
        className={`step-nav-item px-2 ${
          currentStep === 'step3' ? 'step-active' : ''
        } ${step3 && step4 && 'prev-step'}`}
      >
        {step3 ? (
          <LinkContainer to='/payment' className={navLinkActiveClass}>
            <Nav.Link>Payment </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item
        className={`step-nav-item px-2 ${
          currentStep === 'step4' ? 'step-active' : ''
        }`}
      >
        {step4 ? (
          <LinkContainer to='/summary' className={navLinkActiveClass}>
            <Nav.Link>Checkout Summary</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Checkout Summary</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

CheckoutSteps.defaultProps = defaultProps;

CheckoutSteps.propTypes = proptypes;

export default CheckoutSteps;
