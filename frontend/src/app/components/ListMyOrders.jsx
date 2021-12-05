import React from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from './Loader';

/* eslint-disable */
const ListMyOrders = ({ orders, errors, loading }) => {
  React.useEffect(() => {
    document.title = 'My Orders | Beifong Shop';
  }, []);

  return (
    <>
      <div>
        <h4 className='text-left'>My Orders</h4>
      </div>
      <div className='pt-2'>
        {loading ? (
          <Loader />
        ) : (
          <>
            {errors ? (
              <Alert variant='danger'>Failed to load orders</Alert>
            ) : (
              <Table size='sm' responsive striped hover bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders?.length !== 0 ? (
                    orders?.map(order => {
                      return (
                        <tr key={order?._id}>
                          <td>{order?._id}</td>
                          <td>{order?.createdAt.substring(0, 10)}</td>
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
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button size='sm'>Details</Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <Alert variant='info' className='text-center'>
                          No Orders
                        </Alert>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListMyOrders;
