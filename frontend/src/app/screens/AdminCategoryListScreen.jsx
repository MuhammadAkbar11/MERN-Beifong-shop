/* eslint-disable */
import React from 'react';
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
import Message from '@components/Message';
import Loader from '@components/Loader';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import {
  createCategoryAction,
  deleteCategoryAction,
  listCategoriesAction,
  resetListCategoryAlertAction,
  updateCategoryAction,
} from '@actions/category.actions';
import ModalCategoryForm from '@components/ModalCategoryForm';

/* eslint-disable */

const AdminCategoryListScreen = ({ history }) => {
  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Catgories', isActive: true },
  ];

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [deleteCategory, setDeleteCategory] = React.useState(null);

  const [modal, setModal] = React.useState({
    open: false,
    isEdit: false,
  });

  const dispacth = useDispatch();

  const categoryList = useSelector(state => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryAlert = useSelector(state => state.categoryAlert);

  const { loading: loadingDelete } = useSelector(state => state.categoryDelete);
  const { loading: loadingCreate, error: errorCreate } = useSelector(
    state => state.categoryCreate
  );

  const { loading: loadingUpdate, error: errorUpdate } = useSelector(
    state => state.categoryUpdate
  );

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispacth(listCategoriesAction());
    } else {
      history.push('/');
    }
  }, [dispacth, userInfo, history]);

  React.useEffect(() => {
    if (categoryAlert && categoryAlert.open) {
      setTimeout(() => {
        dispacth(resetListCategoryAlertAction());
      }, 6000);
    }

    return () => {
      setSelectedCategory(null);
    };
  }, [categoryAlert]);

  const submitHandler = ({ name, slug, icon, categoryID }) => {
    if (!modal.isEdit) {
      console.log('create');
      return dispacth(createCategoryAction({ name, slug, icon })).then(() => {
        setModal({
          open: false,
          isEdit: false,
        });
        dispacth(listCategoriesAction());
      });
    }

    return dispacth(
      updateCategoryAction({ name, slug, icon, categoryID })
    ).then(() => {
      setModal({
        open: false,
        isEdit: false,
      });
      dispacth(listCategoriesAction());
    });
  };

  // const updateCategoryHandler = data => {
  //   console.log(data);
  // };

  const deleteHandler = () => {
    // console.log(userId);
    if (deleteCategory) {
      return dispacth(deleteCategoryAction(deleteCategory._id)).then(() => {
        setConfirmDelete(false);
        setDeleteCategory(null);
        dispacth(listCategoriesAction());
      });
    }
    setConfirmDelete(false);
  };

  return (
    <Container fluid className='px-0  py-3 h-100 '>
      <BreadcrumbContainer parentClass='ml-n3' items={breadcrumbItems} />

      <Row className='align-items-center my-3'>
        <Col xs={12} sm={6} className='mb-2'>
          <h1>Categories</h1>
        </Col>
        <Col xs={12} sm={6} className='text-sm-right'>
          <Button
            onClick={() => {
              setModal({
                open: true,
                isEdit: false,
              });
            }}
          >
            {/* <div> */}
            <i className='fas fa-plus fa-fw mr-2'></i> Create Category
          </Button>
        </Col>
      </Row>

      {categoryAlert && categoryAlert.open && (
        <div className='py-3'>
          <Alert variant={categoryAlert.type}>{categoryAlert.message}</Alert>
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
              <th>SLUG</th>
              <th>ICON</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
          <tbody>
            {categories.length !== 0 ? (
              categories.map(category => {
                return (
                  <tr key={category._id}>
                    <td>{category._id}</td>
                    <td>{category?.name}</td>
                    <td>{category?.slug}</td>
                    <td>
                      <i className={`fa-fw ${category?.icon}`}></i>
                    </td>

                    <td>
                      <div
                        style={{
                          gap: '.5rem',
                        }}
                        className=' d-flex  '
                      >
                        <Button
                          variant='dark'
                          size='sm'
                          onClick={() => {
                            setSelectedCategory(category);
                            setModal({
                              open: true,
                              isEdit: true,
                            });
                          }}
                        >
                          <i className='fas fa-edit '></i>
                        </Button>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => {
                            setConfirmDelete(true);
                            setDeleteCategory(category);
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
                  <Message>Categories is empty</Message>
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
                <span className='text-danger'>{deleteCategory?.name}</span> ?
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
                  Delete now
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      <ModalCategoryForm
        modal={modal}
        category={selectedCategory}
        loading={!modal.isEdit ? loadingCreate : loadingUpdate}
        error={!modal.isEdit ? errorCreate : errorUpdate}
        onSubmit={submitHandler}
        onHide={() => {
          setModal({
            isEdit: false,
            open: false,
          });
        }}
      />
    </Container>
  );
};

export default AdminCategoryListScreen;
