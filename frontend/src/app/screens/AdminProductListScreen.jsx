/* eslint-disable */
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Modal,
  Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  createProductAction,
  deleteProductAction,
  listProducts,
  resetProductListAlertAction,
} from '../actions/product.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import { PRODUCT_CREATE_RESET } from '../constants/product.constants';

/* eslint-disable */

const AdminProductListScreen = ({ history }) => {
  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Products', isActive: true },
  ];

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const dispacth = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productAlert = useSelector(state => state.productsAlert);

  const { loading: loadingDelete } = useSelector(state => state.productDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = useSelector(state => state.productCreate);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    dispacth({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/');
    } else {
      dispacth(listProducts());
    }
  }, [dispacth, userInfo, history]);

  React.useEffect(() => {
    if (productAlert && productAlert.open) {
      setTimeout(() => {
        dispacth(resetProductListAlertAction());
      }, 6000);
    }
  }, [productAlert]);

  const createProductHandler = () => {
    dispacth(createProductAction()).then(product => {
      history.push(`/admin/product/${product?._id}/edit`);
    });
  };

  const deleteHandler = () => {
    // console.log(userId);
    if (selectedProduct) {
      return dispacth(deleteProductAction(selectedProduct._id)).then(() => {
        setConfirmDelete(false);
        setSelectedProduct(null);
        dispacth(listProducts());
      });
    }
    setConfirmDelete(false);
  };

  return (
    <Container fluid className='px-0  py-3 h-100 '>
      <BreadcrumbContainer parentClass='ml-n3' items={breadcrumbItems} />

      <Row className='align-items-center my-3'>
        <Col xs={12} sm={6} className='mb-2'>
          <h1>Products</h1>
        </Col>
        <Col xs={12} sm={6} className='text-sm-right'>
          <Button disabled={loadingCreate} onClick={createProductHandler}>
            {loadingCreate ? (
              <Loader size={18} />
            ) : (
              <i className='fas fa-plus fa-fw mr-2'></i>
            )}
            Create Product
          </Button>
        </Col>
      </Row>

      {productAlert && productAlert.open && (
        <div className='py-3'>
          <Alert variant={productAlert.type}>{productAlert.message}</Alert>
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
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>STOCK</th>
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
                    <td>{prod?.category?.name}</td>
                    <td className='text-capitalize'>{prod?.brand}</td>
                    <td>{prod?.countInStock}</td>
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
                          disabled={loadingDelete}
                          onClick={() => {
                            setConfirmDelete(true);
                            setSelectedProduct(prod);
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
                Are you sure want to delete{' '}
                <span className='text-danger'>{selectedProduct?.name}</span> ?
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

export default AdminProductListScreen;