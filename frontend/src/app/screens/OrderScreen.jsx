import React from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import FormatRupiah from '../components/FormatRupiah';
import {
  getOrderDetailsAction,
  payOrderAction,
  payOrderResetAction,
} from '../actions/order.actions';
import Loader from '../components/Loader';
import useConvertCurrency from '../hooks/useConvertCurrency';
import localeStringDate from '../utils/localeStringDate';
/* eslint-disable */
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = React.useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderTotalPrice = order?.totalPrice;

  const [currencyValue, loadingCurr] = useConvertCurrency({
    amount: orderTotalPrice?.num || 0,
    fromCurrency: 'IDR',
    toCurrency: 'USD',
  });

  React.useEffect(() => {
    const addPayPalScript = async () => {
      const {
        data: { client_id },
      } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch(payOrderResetAction());
      dispatch(getOrderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (userInfo?._id === order?._id) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, successPay, order, userInfo]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(orderId, paymentResult));
  };

  const payAtDateFormat = localeStringDate(order?.paidAt);
  const deliveredAtDateFormat = localeStringDate(order?.deliveredAt);
  const isUserOrdering = userInfo?._id === order?._id;

  return (
    <Container fluid className='px-0 py-3 h-100'>
      <Row className='mb-5 px-0'>
        <Col md={5} className='pl-0'>
          <BreadcrumbContainer
            items={[
              { name: 'Home', href: '/' },
              { name: 'Checkout', isActive: true },
              { name: 'Summary', isActive: true },
            ]}
          />
        </Col>
        <Col md={7}>
          {/* {!order?.isDelivered && !order?.isPaid && ( */}
          <CheckoutSteps step1 step2 step3 step4 currentStep='step4' />
          {/* )} */}
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.message}</Message>
      ) : (
        <>
          <Row className=' px-0'>
            <Col md={8} className='px-0'>
              <ListGroup variant='flush'>
                <ListGroup.Item className='border-0 py-1 '>
                  <h6 className='text-primary'>Order ID</h6>
                  <h2>{order?._id}</h2>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 py-1 '>
                  <h6 className='text-primary font-weight-bold'>Shipping</h6>
                  <p className='mb-1'>
                    <strong className='text-dark'>Name : </strong>
                    {order?.user?.name}
                  </p>
                  <p className='mb-1'>
                    <strong className='text-dark'>Email : </strong>
                    <a href={`mailto:${order?.user?.email}`}>
                      {order?.user?.email}
                    </a>
                  </p>
                  <p className='mb-1'>
                    <strong className='text-dark'>Address : </strong>
                    {order?.shippingAddress?.address},{' '}
                    {order?.shippingAddress?.city},{' '}
                    {order?.shippingAddress?.postalCode},{' '}
                    {order?.shippingAddress?.country}
                  </p>
                  <p>
                    <span className='text-dark'>Delivered Status: </span>{' '}
                    {order.isDelivered ? (
                      <span className='text-success'>
                        Delivered On {deliveredAtDateFormat}
                      </span>
                    ) : (
                      <span className='text-danger'>Not Delivered</span>
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 py-1 '>
                  <h6 className='text-primary font-weight-bolder'>Payment</h6>
                  <p className='mb-1'>
                    <span className='text-dark'>Method: </span>{' '}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className='text-dark'>Paid Status: </span>{' '}
                    {order.isPaid ? (
                      <span className='text-success'>
                        Paid On {payAtDateFormat}
                      </span>
                    ) : (
                      <span className='text-danger'>Not Paid</span>
                    )}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                  <h6 className='text-primary font-weight-bold'>
                    Orders{' '}
                    <span className='text-black-50'>
                      ({order.orderItems.length} Items)
                    </span>
                  </h6>
                  {order.orderItems.length === 0 ? (
                    <>
                      <br />
                      <div className='text-center'>
                        <Message variant='warning'>Order is empty</Message>
                      </div>
                    </>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => {
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
                                    value={Number(+item.qty * +item.price.num)}
                                  />
                                </div>{' '}
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
                      value={+order.itemsPrice?.num}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className='  d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0  '>
                    <span>Shipping Price</span>
                    <FormatRupiah
                      className='font-weight-bold text-dark '
                      value={+order.shippingPrice?.num || 0}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className='   d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0 '>
                    <span>Tax</span>
                    <FormatRupiah
                      className='font-weight-bold text-dark '
                      value={+order.taxPrice?.num || 0}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className='  d-flex flex-md-column flex-lg-row  justify-content-between bg-transparent px-0 text-primary font-weight-bold  '>
                    <span>Total Price</span>
                    <FormatRupiah value={+order.totalPrice?.num || 0} />
                  </ListGroup.Item>
                  {/* {isUserOrdering} */}
                  {isUserOrdering && !order?.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && (
                        <Loader height={20} width={20} className='my-2' />
                      )}
                      {!sdkReady ? (
                        <Loader height={20} width={20} />
                      ) : (
                        !loadingCurr && (
                          <PayPalButton
                            amount={currencyValue}
                            onSuccess={successPaymentHandler}
                          />
                        )
                      )}
                    </ListGroup.Item>
                  )}
                  {/* {error ? (
                    <ListGroup.Item className=' border-bottom-0  d-flex  bg-transparent px-0 pb-0  '>
                      <div className='flex-grow-1 text-center'>
                        <Message variant='danger'>{orderError.message}</Message>
                      </div>
                    </ListGroup.Item>
                  ) : null} */}

                  {/* <ListGroup.Item className='bg-transparent px-0'>
                    <Button
                      onClick={placeOrderHandler}
                      type='button'
                      className='btn btn-primary btn-block d-flex justify-content-center'
                      disabled={order.cartItems.length === 0 || loading}
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
                  </ListGroup.Item> */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default OrderScreen;
