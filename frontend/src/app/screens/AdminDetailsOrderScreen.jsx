import React from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import localeStringDate from '@utils/localeStringDate';
import { getOrderDetailsAction } from '@actions/order.actions';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import Message from '@components/Message';
import FormatRupiah from '@components/FormatRupiah';
import Loader from '@components/Loader';
import { Helmet } from 'react-helmet';
import { LinkContainer } from 'react-router-bootstrap';
/* eslint-disable */
const AdminDetailsOrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const { userInfo } = useSelector(state => state.userLogin);
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrderDetailsAction(orderId));
    } else {
      history.push('/');
    }
  }, [dispatch, userInfo, history, orderId]);

  const payAtDateFormat = localeStringDate(order?.paidAt);
  const deliveredAtDateFormat = localeStringDate(order?.deliveredAt);

  let breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Orders', href: '/admin/orderlist' },
    { name: order?._id?.toUpperCase() || 'Loading...', isActive: true },
  ];

  if (!order) {
    return (
      <>
        <Helmet>
          <title>Beifong Shop Admistrator | Order Details</title>
        </Helmet>
        <Container fluid className='px-0 py-3 h-100'>
          <Row className='mb-3 px-0'>
            <Col md={5} className='pl-0'>
              <BreadcrumbContainer items={breadcrumbItems} />
            </Col>
            <Col md={12}>
              <h3 className='mb-0'>Order Summary</h3>
            </Col>
          </Row>
          <Loader />
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Beifong Shop Admistrator | Order Details</title>
      </Helmet>
      <Container fluid className='px-0 py-3 h-100'>
        <Row className='mb-3 px-0'>
          <Col md={5} className='pl-0'>
            <BreadcrumbContainer items={breadcrumbItems} />
          </Col>
          <Col md={12}>
            <h3 className='mb-0'>Order Summary</h3>
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
                      {order?.isDelivered ? (
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
                      {order?.paymentMethod}
                    </p>
                    <p>
                      <span className='text-dark'>Paid Status: </span>{' '}
                      {order?.isPaid ? (
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
                                      value={Number(
                                        +item.qty * +item.price.num
                                      )}
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

                <div className='mt-2'>
                  <LinkContainer to='/admin/orderlist'>
                    <Button className='ml-3'>Go Back</Button>
                  </LinkContainer>
                </div>
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
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminDetailsOrderScreen;
