/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
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
  Breadcrumb,
  Table,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '@actions/cart.actions';
import FormatRupiah from '@components/FormatRupiah';
import { Helmet } from 'react-helmet';

/* eslint-disable */

const CartScreen = ({ history, match, location }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const { cartItems, loading } = cart;

  const goHome = e => {
    e.preventDefault();
    history.push('/');
  };

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const addCartHandler = (product, value) => {
    dispatch(addToCart(product, +value));
  };

  const checkoutHandler = () => {
    console.log('checkout');
    history.push('/login?redirect=shipping');
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.qty * +item.price.num;
  }, 0);

  return (
    <>
      <Helmet>
        <title>Beifong Shop | Cart</title>
      </Helmet>
      <Container fluid className='px-0 py-3'>
        <Breadcrumb className='ml-n2'>
          <Breadcrumb.Item
            as='li'
            className=''
            href='/'
            onClick={e => goHome(e)}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Row className=' align-items-stretch  '>
          <Col md={8}>
            <div className=' w-100 d-flex justify-content-between '>
              <div>
                <h3 className='text-dark'>Shopping Cart</h3>
                {/* <Button onClick={() => history.goBack()} className='btn btn-light'>
              Go Back
            </Button> */}
              </div>
              <div>
                {' '}
                <h3>Total ({cartItems.length !== 0 ? cartItems.length : 0})</h3>
              </div>
            </div>
            <hr />
            <div className='w-100 mt-5 text-center'>
              {cartItems.length === 0 ? (
                <h6 className='text-capitalize mb-4'>
                  Your cart is empty{' '}
                  <Link to='/products' className='text-primary-light'>
                    Go Back
                  </Link>
                </h6>
              ) : (
                <>
                  <Row>
                    <Col sm={12}>
                      <Table responsive className='px-0'>
                        <thead className='font-weight-bold'>
                          <tr>
                            <th scope='col' className='text-left pl-0'>
                              Description
                            </th>
                            <th></th>
                            <th colSpan='1'>Quantity</th>
                            <th>X</th>
                          </tr>
                        </thead>
                        <tbody className='pl-0'>
                          {cartItems.map(item => {
                            return (
                              <tr key={item.product}>
                                <td
                                  className='pl-0 '
                                  style={{
                                    maxWidth: '300px',

                                    texOverflow: 'ellipsis',
                                  }}
                                >
                                  <Row className='d-flex '>
                                    <Col md={6} lg={4}>
                                      <Image
                                        className='w-100 '
                                        src={item.image}
                                        alt={item.name}
                                        rounded
                                      />
                                    </Col>
                                    <Col
                                      md={6}
                                      lg={8}
                                      className='text-left pt-2 pt-lg-0 '
                                    >
                                      <Link
                                        className='my-auto '
                                        to={`/product/${item.product}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </Col>
                                  </Row>
                                </td>
                                <td className='text-primary-light'>
                                  {' '}
                                  {item.price?.rupiah}
                                </td>
                                <td>
                                  <div>
                                    <Form.Control
                                      size='sm'
                                      as='select'
                                      value={item.qty}
                                      readOnly={loading}
                                      onChange={e =>
                                        addCartHandler(
                                          item.product,
                                          +e.target.value
                                        )
                                      }
                                    >
                                      {[...Array(item.countInStock).keys()].map(
                                        x => {
                                          const key = x + 1;
                                          return (
                                            <option key={key} value={key}>
                                              {key}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Form.Control>
                                  </div>
                                </td>
                                <td>
                                  {' '}
                                  <Button
                                    size='sm'
                                    type='button'
                                    variant='light'
                                    onClick={() =>
                                      removeFromCartHandler(item.product)
                                    }
                                    disabled={loading}
                                  >
                                    <i className='fas fa-trash'></i>
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </Col>
          <Col md={4}>
            <Card className='bg-slate-light border-0 pt-4 pb-3'>
              <ListGroup variant='flush' className=' bg-transparent px-4 '>
                <ListGroup.Item className=' bg-transparent px-0  '>
                  <h5>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h5>
                  <FormatRupiah value={totalPrice} />
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent px-0'>
                  <Button
                    onClick={checkoutHandler}
                    type='button'
                    className='btn btn-primary btn-block'
                    disabled={cartItems.length === 0 || loading}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
