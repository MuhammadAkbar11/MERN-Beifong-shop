import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUserAction, getUserListAction } from '../actions/user.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import {
  getListOrderAction,
  orderListAlertResetAction,
} from '../actions/order.actions';

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

  // const { loading: loadingDelete } = useSelector(state => state.userDelete);
  const loadingDelete = false;
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
    if (selectedOrder) {
      return dispacth(deleteUserAction(selectedOrder._id)).then(() => {
        setConfirmDelivered(false);
        setSelecteOrder(null);
        dispacth(getUserListAction());
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
                        className=' d-flex  '
                      >
                        <Button
                          variant='success'
                          size='sm'
                          onClick={() => {
                            setConfirmDelivered(true);
                            setSelecteOrder(order);
                          }}
                        >
                          <i className='fas fa-check-square '></i>
                        </Button>
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
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delivered order </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDelete ? (
            <div className='py-3'>
              <Loader />
            </div>
          ) : (
            <>
              <h4
                style={{
                  letterSpacing: 0,
                  textTransform: 'none',
                }}
                className='text-spacing-0 font-weight-normal '
              >
                Are you sure want to confirm order as delivered?
              </h4>
              <div className='d-flex justify-content-end mt-4 '>
                <Button
                  variant='secondary'
                  onClick={() => setConfirmDelivered(false)}
                >
                  Close
                </Button>
                <Button
                  variant='danger'
                  className='ml-2'
                  onClick={() => confirmDeliveredHandler()}
                >
                  Save Changes
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
