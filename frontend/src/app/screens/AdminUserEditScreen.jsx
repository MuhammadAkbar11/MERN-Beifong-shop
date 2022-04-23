/* eslint-disable */
import React from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '@components/Message';
import Loader from '@components/Loader';
import {
  getUserDetailsAction,
  updateUserAction,
} from '@actions/v2/user.actions';
import FormContainer from '@components/FormContainer';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import { USER_UPDATE_RESET } from '@constants/user.constants';

const AdminUserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.session);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // const redirect = location.search ? location.search.split('=')[1] : '/';

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      // dispacth(getUserListAction());
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetailsAction(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    } else {
      history.push('/');
    }

    return () => {
      setDisabledSubmit(false);
    };
  }, [dispatch, userInfo, history, user, userId]);

  React.useEffect(() => {
    if (loadingUpdate) {
      setDisabledSubmit(true);
    }

    if (errorUpdate && errorUpdate.validation) {
      setDisabledSubmit(true);
    }
  }, [loadingUpdate, errorUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin }))
      .then(() => {
        dispatch({
          type: USER_UPDATE_RESET,
        });
        history.push('/admin/userlist');
      })
      .catch(err => {
        setErrorAlert(err);
      });
  };

  return (
    <Container className='px-0 py-3'>
      <BreadcrumbContainer
        items={[
          { name: 'Administrator', href: '/admin' },
          { name: 'Users', href: '/admin/userlist' },
          { name: user?.name, isActive: true },
          { name: 'Edit', isActive: true },
        ]}
        parentClass='ml-n3'
      />
      <br />
      <Row>
        <Col xs={12}>
          <FormContainer>
            <h3 className='text-primary'>Edit User</h3>

            {errorAlert && !errorAlert.validation && (
              <Alert
                onClose={() => setErrorAlert(null)}
                dismissible
                variant='danger'
              >
                {errorAlert?.message}
              </Alert>
            )}

            {loading ? (
              <div>
                <Loader />
              </div>
            ) : error ? (
              <Message variant='danger'>{error?.message}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      setDisabledSubmit(false);
                    }}
                    readOnly={loadingUpdate}
                    isInvalid={!!errorUpdate?.validation?.name}
                  />

                  {errorUpdate?.validation?.name ? (
                    <Form.Control.Feedback type='invalid'>
                      {errorUpdate.validation.name.message[0]}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      setDisabledSubmit(false);
                    }}
                    readOnly={loadingUpdate}
                    isInvalid={!!errorUpdate?.validation?.email}
                  />

                  {errorUpdate?.validation?.email ? (
                    <Form.Control.Feedback type='invalid'>
                      {errorUpdate.validation.email.message[0]}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group controlId='isadmin'>
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    // value={isAdmin}
                    checked={isAdmin}
                    readOnly={loadingUpdate}
                    onChange={e => {
                      setIsAdmin(e.target.checked);
                      setDisabledSubmit(false);
                    }}
                    isInvalid={!!errorUpdate?.validation?.isAdmin}
                  />
                  {errorUpdate?.validation?.isAdmin ? (
                    <Form.Control.Feedback type='invalid'>
                      {errorUpdate.validation.isAdmin.message[0]}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>

                <Form.Group>
                  <Button
                    type='submit'
                    variant='primary'
                    className=' d-flex align-items-center '
                    disabled={disabledSubmit}
                  >
                    {loading ? (
                      <>
                        <Loader width={11} height={11} />{' '}
                        <span className='ml-2'> Update User</span>
                      </>
                    ) : (
                      'Update User'
                    )}
                  </Button>
                </Form.Group>
              </Form>
            )}
          </FormContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUserEditScreen;
