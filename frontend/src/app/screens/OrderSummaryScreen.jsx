import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import FormatRupiah from '../components/FormatRupiah';
import { addToCart } from '../actions/cart.actions';
import { createOrderAction } from '../actions/order.actions';
import Loader from '../components/Loader';
/* eslint-disable */
const OrderSummarycreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  cart.totalCartItems = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.qty * +item.price.num;
  }, 0);

  cart.shippingPrice =
    cart.itemsPrice > 1000000 ? 25000 : cart.itemsPrice < 500000 ? 7000 : 15000;
  cart.taxPrice = Number(0.05 * cart.itemsPrice);
  cart.totalPrice = +cart.itemsPrice + +cart.shippingPrice + +cart.taxPrice;

  const orderCreate = useSelector(state => state.orderCreate);

  const { loading, order, success, error, orderError } = orderCreate;

  React.useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Container className='px-1 px-sm-0 py-3 h-100'>
      <Row className='mb-5'>
        <Col md={5}>
          <BreadcrumbContainer
            items={[
              { name: 'Home', href: '/' },
              { name: 'Checkout', isActive: true },
              { name: 'summary', isActive: true },
            ]}
          />
        </Col>
        <Col md={7}>
          <CheckoutSteps step1 step2 step3 step4 currentStep='step4' />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item className='border-0 py-1 '>
              <h6 className='text-primary'>Shipping</h6>
              <p>
                {/* <strong>Address : </strong> */}
                {cart.shippingAddress?.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='border-0 py-1 '>
              <h6 className='text-primary'>Payment Method </h6>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
              <h6 className='text-primary'>
                Orders{' '}
                <span className='text-black-50'>
                  ({cart.totalCartItems} Items)
                </span>
              </h6>
              {cart.cartItems.length === 0 ? (
                <>
                  <br />
                  <div className='text-center'>
                    <Message variant='warning'>Your cart is empty</Message>
                  </div>
                </>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => {
                    const key = index;
                    return (
                      <ListGroup.Item key={key} className='border-0 '>
                        <Row className='d-flex align-items-stretch  '>
                          <Col md={3} className='mb-4  mb-md-0'>
                            <Image
                              height='100%'
                              fluid
                              src={item.image}
                              alt={item.name}
                            />
                          </Col>
                          <Col className='d-flex flex-column align-items-start justify-content-start '>
                            <h4>
                              <Link
                                className='font-weight-bold text-dark'
                                to={`/product/${item.product}`}
                              >
                                {item.name}
                              </Link>
                            </h4>
                            <div className=' text-nowrap font-weight-bold  '>
                              <span className='text-black-50'>
                                {' '}
                                {item.price.rupiah}{' '}
                              </span>
                              <span className='text-primary font-weight-bolder'>
                                {' '}
                                x ({item.qty}) =
                              </span>{' '}
                              <FormatRupiah
                                className='text-success'
                                value={+item.qty * +item.price.num}
                              />
                            </div>{' '}
                            <div className=' d-inline-block mt-3 mt-md-auto '>
                              <Form.Control
                                size='sm'
                                as='select'
                                value={item.qty}
                                onChange={e =>
                                  dispatch(
                                    addToCart(item.product, +e.target.value)
                                  )
                                }
                              >
                                {[...Array(item.countInStock).keys()].map(x => {
                                  const idStock = x + 1;
                                  return (
                                    <option key={idStock} value={idStock}>
                                      {idStock}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </div>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='bg-slate-light border-0 pt-4 pb-3'>
            <ListGroup variant='flush' className=' bg-transparent px-4 '>
              <ListGroup.Item className=' bg-transparent px-0 border-bottom-0 pb-0 '>
                <h5>Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item className=' border-bottom-0  d-flex flex-md-column flex-lg-row justify-content-between bg-transparent px-0  pb-0 '>
                <span>Subtotal</span>
                <FormatRupiah
                  className='font-weight-bold text-dark '
                  value={cart.itemsPrice}
                />
              </ListGroup.Item>
              <ListGroup.Item className='  d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0  '>
                <span>Shipping Price</span>
                <FormatRupiah
                  className='font-weight-bold text-dark '
                  value={cart.shippingPrice || 0}
                />
              </ListGroup.Item>
              <ListGroup.Item className='   d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0 '>
                <span>Tax</span>
                <FormatRupiah
                  className='font-weight-bold text-dark '
                  value={cart.taxPrice || 0}
                />
              </ListGroup.Item>
              <ListGroup.Item className='  d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0 text-primary font-weight-bold  '>
                <span>Total Price</span>
                <FormatRupiah value={cart.totalPrice || 0} />
              </ListGroup.Item>

              {error ? (
                <ListGroup.Item className=' border-bottom-0  d-flex  bg-transparent px-0 pb-0  '>
                  <div className='flex-grow-1 text-center'>
                    <Message variant='danger'>{orderError.message}</Message>
                  </div>
                </ListGroup.Item>
              ) : null}

              <ListGroup.Item className='bg-transparent px-0'>
                <Button
                  onClick={placeOrderHandler}
                  type='button'
                  className='btn btn-primary btn-block d-flex justify-content-center'
                  disabled={cart.cartItems.length === 0 || loading}
                >
                  {loading ? (
                    <>
                      <div className='d-flex'>
                        <Loader height={15} width={15} />
                        <span className='ml-2'>Order now</span>
                      </div>
                    </>
                  ) : (
                    'Order now'
                  )}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSummarycreen;
