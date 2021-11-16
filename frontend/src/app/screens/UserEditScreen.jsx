/* eslint-disable */
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetailsAction,
  userRegisterAction,
} from '../actions/user.actions';
import FormContainer from '../components/FormContainer';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

const UserEditScreen = ({ match, location, history }) => {
  const userId = match.params.id;

  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

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

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Container className='px-0 py-3'>
      <BreadcrumbContainer
        items={[
          { name: 'Administrator', href: '/admin' },
          { name: 'Users', href: '/admin/userlist' },
          { name: name, isActive: true },
          { name: 'Edit', isActive: true },
        ]}
        parentClass='ml-n4'
      />
      <br />
      <Row>
        <Col xs={12}>
          <FormContainer>
            <h3 className='text-primary'>Edit User</h3>

            {error && !error.validation && (
              <Message variant='danger'>{error.message}</Message>
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
                    isInvalid={!!error?.validation?.name}
                  />

                  {error?.validation?.name ? (
                    <Form.Control.Feedback type='invalid'>
                      {error.validation.name.message[0]}
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
                    isInvalid={!!error?.validation?.email}
                  />

                  {error?.validation?.email ? (
                    <Form.Control.Feedback type='invalid'>
                      {error.validation.email.message[0]}
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
                    onChange={e => {
                      setIsAdmin(e.target.checked);
                      setDisabledSubmit(false);
                    }}
                    isInvalid={!!error?.validation?.isAdmin}
                  />
                  {error?.validation?.isAdmin ? (
                    <Form.Control.Feedback type='invalid'>
                      {error.validation.isAdmin.message[0]}
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

export default UserEditScreen;
