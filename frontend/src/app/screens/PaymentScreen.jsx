import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cart.actions';
import CheckoutSteps from '../components/CheckoutSteps';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import isObjectEmpty from '../utils/isObjectEmpty';

/* eslint-disable */
const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);

  const { shippingAddress } = cart;

  if (isObjectEmpty(shippingAddress)) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const onChangeHandler = e => {
    const value = e.target.value;
    setPaymentMethod(value);
  };

  const submitHandler = form => {
    form.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/summary');
  };

  return (
    <Container fluid className='px-1 px-sm-0 py-3 h-100 '>
      <Row className='mb-5'>
        <Col md={5}>
          <BreadcrumbContainer
            items={[
              { name: 'Home', href: '/' },
              { name: 'Checkout', isActive: true },
              { name: 'Payment', isActive: true },
            ]}
          />
        </Col>
        <Col md={7}>
          <CheckoutSteps step1 step2 step3 currentStep='step3' />
        </Col>
      </Row>
      <FormContainer>
        <h3 className='text-primary'>Payment Method</h3>
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal'
                id='Paypal'
                name='paymentMethod'
                value='Paypal'
                checked
                onChange={onChangeHandler}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Form.Group className='pt-3'>
            <Button type='submit' variant='primary' className='d-flex ml-auto'>
              Continue
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default PaymentScreen;
