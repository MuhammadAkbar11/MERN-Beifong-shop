import React from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import FormContainer from '../components/FormContainer';
import { saveShippingAddressAction } from '../actions/cart.actions';
import CheckoutSteps from '../components/CheckoutSteps';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

const shippingSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal code is required'),
  country: Yup.string().required('Country is Required'),
});

/* eslint-disable */
const ShippingScreen = ({ history }) => {
  // Breadcrumbs Items

  const cart = useSelector(state => state.cart);

  const { shippingAddress } = cart;

  let shippingAddressFormsInitValues = {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  };

  if (shippingAddress !== {}) {
    shippingAddressFormsInitValues.address = shippingAddress.address
      ? shippingAddress.address
      : '';
    shippingAddressFormsInitValues.city = shippingAddress.city
      ? shippingAddress.city
      : '';
    shippingAddressFormsInitValues.postalCode = shippingAddress.postalCode
      ? shippingAddress.postalCode
      : '';
    shippingAddressFormsInitValues.country = shippingAddress.country
      ? shippingAddress.country
      : '';
  }

  const dispatch = useDispatch();

  const shippingFormik = useFormik({
    validationSchema: shippingSchema,
    initialValues: shippingAddressFormsInitValues,
    enableReinitialize: true,
    onSubmit: values => {
      dispatch(saveShippingAddressAction(values));
      history.push('/payment');
    },
  });

  return (
    <Container fluid className='px-1 px-sm-0 py-3 h-100 '>
      <Row className='mb-5'>
        <Col md={5}>
          <BreadcrumbContainer
            items={[
              { name: 'Home', href: '/' },
              { name: 'Checkout', isActive: true },
              { name: 'Shipping', isActive: true },
            ]}
          />
        </Col>
        <Col md={7}>
          <CheckoutSteps step1 step2 currentStep='step2' />
        </Col>
      </Row>

      <FormContainer>
        <h3 className='text-primary'>Shipping</h3>
        <br />
        <Form onSubmit={shippingFormik.handleSubmit}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your addres'
              value={shippingFormik.values.address}
              onChange={shippingFormik.handleChange}
              isInvalid={!!shippingFormik.errors.address}
            />

            <Form.Control.Feedback type='invalid'>
              {shippingFormik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your city'
              value={shippingFormik.values.city}
              onChange={shippingFormik.handleChange}
              isInvalid={!!shippingFormik.errors.city}
            />

            <Form.Control.Feedback type='invalid'>
              {shippingFormik.errors.city}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your addres'
              value={shippingFormik.values.postalCode}
              onChange={shippingFormik.handleChange}
              isInvalid={!!shippingFormik.errors.postalCode}
            />

            <Form.Control.Feedback type='invalid'>
              {shippingFormik.errors.postalCode}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your addres'
              value={shippingFormik.values.country}
              onChange={shippingFormik.handleChange}
              isInvalid={!!shippingFormik.errors.country}
            />

            <Form.Control.Feedback type='invalid'>
              {shippingFormik.errors.country}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='pt-3'>
            <Button
              type='submit'
              disabled={
                // userUpdateProfile.loading || !userProfileFormik.isValid
                !shippingFormik.isValid
              }
              className='d-flex ml-auto'
            >
              Continue
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingScreen;
