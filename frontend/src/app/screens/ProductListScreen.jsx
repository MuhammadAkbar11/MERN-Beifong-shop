/* eslint-disable */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Modal,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  deleteUserAction,
  getUserListAction,
  resetUserListAlertAction,
} from '../actions/user.actions';
import { listProducts } from '../actions/product.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

/* eslint-disable */

const ProductListScreen = ({ history, match }) => {
  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Products', isActive: true },
  ];

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const dispacth = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  // const userListAlert = useSelector(state => state.userListAlert);
  const loadingDelete = false;
  // const { loading: loadingDelete } = useSelector(state => state.userDelete);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispacth(listProducts());
    } else {
      history.push('/');
    }
  }, [dispacth, userInfo, history]);

  // React.useEffect(() => {
  //   if (userListAlert && userListAlert.open) {
  //     setTimeout(() => {
  //       dispacth(resetUserListAlertAction());
  //     }, 6000);
  //   }

  //   return () => {
  //     setSelectedUser(null);
  //   };
  // }, [userListAlert]);

  const createProductHandler = () => {};

  // const deleteHandler = () => {
  //   // console.log(userId);
  //   if (selectedUser) {
  //     return dispacth(deleteUserAction(selectedUser._id)).then(() => {
  //       setConfirmDelete(false);
  //       setSelectedUser(null);
  //       dispacth(getUserListAction());
  //     });
  //   }
  //   setConfirmDelete(false);
  // };

  return (
    <Container fluid className='px-0  py-3 h-100 '>
      <BreadcrumbContainer parentClass='ml-n3' items={breadcrumbItems} />

      <Row className='align-items-center my-3'>
        <Col xs={12} sm={6} className='mb-2'>
          <h1>Products</h1>
        </Col>
        <Col xs={12} sm={6} className='text-sm-right'>
          <Button onClick={createProductHandler}>
            {/* <div> */}
            <i className='fas fa-plus fa-fw mr-2'></i> Create Product
          </Button>
        </Col>
      </Row>

      {/* {userListAlert && userListAlert.open && (
        <div className='py-3'>
          <Alert variant={userListAlert.type}>{userListAlert.message}</Alert>
        </div>
      )} */}

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
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
          <tbody>
            {products.length !== 0 ? (
              products.map(prod => {
                return (
                  <tr key={prod._id}>
                    <td>{prod._id}</td>
                    <td>{prod?.name}</td>
                    <td>{prod?.price?.rupiah}</td>
                    <td>{prod?.category}</td>
                    <td className='text-capitalize'>{prod?.brand}</td>
                    <td>
                      <div
                        style={{
                          gap: '.5rem',
                        }}
                        className=' d-flex  '
                      >
                        <LinkContainer to={`/admin/product/${prod._id}`}>
                          <Button variant='light' size='sm'>
                            <i className='fas fa-info-circle '></i>
                          </Button>
                        </LinkContainer>
                        <LinkContainer to={`/admin/product/${prod._id}/edit`}>
                          <Button variant='dark' size='sm'>
                            <i className='fas fa-edit '></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => {
                            // setConfirmDelete(true);
                            // setSelectedUser(user);
                          }}
                        >
                          <i className='fas fa-trash '></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <Message>Products is empty</Message>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal
        centered
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User </Modal.Title>
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
                Are you sure want to delete {selectedUser?.name} user?
              </h4>
              <div className='d-flex justify-content-end mt-4 '>
                <Button
                  variant='secondary'
                  onClick={() => setConfirmDelete(false)}
                >
                  Close
                </Button>
                <Button
                  variant='danger'
                  className='ml-2'
                  onClick={() => deleteHandler()}
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

export default ProductListScreen;
