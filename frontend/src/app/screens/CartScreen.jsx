import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';

/* eslint-disable */

const CartScreen = ({ history }) => {
  return (
    <Container fluid className='px-0 py-3'>
      <Button onClick={() => history.goBack()} className='btn btn-light'>
        Go Back
      </Button>

      <Row className='pt-3 align-items-stretch  '>
        <Col>
          <h1>Cart Page</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
