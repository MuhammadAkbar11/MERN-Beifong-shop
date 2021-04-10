import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';

const defaultProps = {};

const proptypes = {
  children: PropTypes.node.isRequired,
};

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className=' justify-content-md-center '>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

FormContainer.defaultProps = defaultProps;

FormContainer.propTypes = proptypes;

export default FormContainer;
