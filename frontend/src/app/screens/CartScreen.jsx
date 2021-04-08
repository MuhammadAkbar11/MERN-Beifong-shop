import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Col,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '@components/Message';
import { addToCart } from '../actions/cart.actions';

/* eslint-disable */

const CartScreen = ({ history, match, location }) => {
  const productId = match.params.productId;

  const qty = location.search ? +location.search.split('=')[1] : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  React.useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

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
