import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmOrderDeliverAction,
  getListOrderAction,
  orderListAlertResetAction,
} from '@actions/order.actions';
import Message from '@components/Message';
import Loader from '@components/Loader';
import BreadcrumbContainer from '@components/BreadcrumbContainer';

/* eslint-disable */

const AdminOrderListScreen = ({ history }) => {
  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: '', isActive: true },
  ];

  const [confirmDelivered, setConfirmDelivered] = React.useState(false);
  const [selectedOrder, setSelecteOrder] = React.useState(null);

  const dispacth = useDispatch();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;
  const orderListAlert = useSelector(state => state.orderListAlert);

  const { loading: loadingConfirmDeliver } = useSelector(
    state => state.orderConfirmDeliver
  );
  // const loadingConfirmDeliver = false;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispacth(getListOrderAction());
    } else {
      history.push('/');
    }
  }, [dispacth, userInfo, history]);

  React.useEffect(() => {
    if (orderListAlert && orderListAlert.open) {
      setTimeout(() => {
        dispacth(orderListAlertResetAction());
      }, 6000);
    }

    return () => {
      setSelecteOrder(null);
    };
  }, [orderListAlert, dispacth]);

  const confirmDeliveredHandler = () => {
    // console.log(userId);
    if (selectedOrder && !selectedOrder.isDelivered) {
      // console.log('okkkk');
      return dispacth(confirmOrderDeliverAction(selectedOrder._id)).then(() => {
        setConfirmDelivered(false);
        setSelecteOrder(null);
        dispacth(getListOrderAction());
      });
    }
    setConfirmDelivered(false);
  };

  return (
    <Container fluid className='px-0  py-3 h-100 '>
      <BreadcrumbContainer parentClass='ml-n3' items={breadcrumbItems} />
      <h1>Orders</h1>
      {orderListAlert && orderListAlert.open && (
        <div className='py-3'>
          <Alert variant={orderListAlert.type}>{orderListAlert.message}</Alert>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.message || error?.errors?.message || 'Something went wrong'}
        </Message>
      ) : (
        <Table responsive striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>DATE</th>
              <th>COSTUMER</th>
              <th>ID</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
          <tbody>
            {orders.length !== 0 ? (
              orders.map(order => {
                return (
                  <tr key={order._id}>
                    <td>{order?.createdAt.substring(0, 10)}</td>
                    <td>{order?.user?.name}</td>
                    <td>{order?._id}</td>
                    <td>{order?.totalPrice?.rupiah}</td>
                    <td>
                      {order.isPaid ? (
                        <span className=' text-success font-weight-bold '>
                          {order?.paidAt?.substring(0, 10)}
                        </span>
                      ) : (
                        <span className='badge badge-danger '>
                          <i className=' fa fa-times '></i>
                        </span>
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        <span className=' text-success font-weight-bold '>
                          {order?.deliveredAt?.substring(0, 10)}
                        </span>
                      ) : (
                        <span className='badge badge-danger '>
                          <i className=' fa fa-times '></i>
                        </span>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          gap: '.5rem',
                        }}
                        className=' d-flex align-items-center '
                      >
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light' size='sm'>
                            <i className='fas fa-info '></i>
                          </Button>
                        </LinkContainer>
                        {!order.isDelivered && (
                          <Button
                            variant='primary'
                            size='sm'
                            className='text-nowrap'
                            onClick={() => {
                              setConfirmDelivered(true);
                              setSelecteOrder(order);
                            }}
                          >
                            Mark As Delivered
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <Alert variant='info' className='text-center'>
                    Orders is empty
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal
        centered
        show={confirmDelivered}
        onHide={() => setConfirmDelivered(false)}
      >
        <Modal.Header closeButton className='border-0'>
          <Modal.Title className='d-none'>Are you sure? </Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-3 '>
          {loadingConfirmDeliver ? (
            <div className='py-3'>
              <Loader />
            </div>
          ) : (
            <>
              <h4 className='text-spacing-0 font-weight-normal text-center'>
                Are you sure?
              </h4>
              <p className='text-spacing-0 font-weight-normal text-center text-primary-light '>
                You will confirmation this order as delivered
              </p>

              <div className='d-flex justify-content-center mt-4 '>
                <Button
                  variant='secondary'
                  onClick={() => setConfirmDelivered(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant='primary'
                  className='ml-2'
                  onClick={() => confirmDeliveredHandler()}
                >
                  Yes
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminOrderListScreen;
