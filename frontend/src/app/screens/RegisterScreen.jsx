import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userRegisterAction } from '../actions/user.actions';
import FormContainer from '../components/FormContainer';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

/* eslint-disable */
const RegisterScreen = ({ location, history }) => {
  const [breadcrumbItems] = React.useState([
    { name: 'Home', href: '/' },
    { name: 'Registration', isActive: true },
  ]);

  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  React.useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }

    if (loading) {
      setDisabledSubmit(true);
    }

    if (error && error.validation) {
      setDisabledSubmit(true);
    }

    return () => {
      setDisabledSubmit(false);
    };
  }, [loading, error, userInfo, history]);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(userRegisterAction(name, email, password, password2));
  };
  return (
    <Container className='px-0 py-3'>
      <BreadcrumbContainer items={breadcrumbItems} />
      <FormContainer>
        <h3 className='text-primary'>Registration</h3>

        {error && !error.validation && (
          <Message variant='danger'>{error.message}</Message>
        )}

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
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setDisabledSubmit(false);
              }}
              isInvalid={!!error?.validation?.password}
            />
            {error?.validation?.password ? (
              <Form.Control.Feedback type='invalid'>
                {error.validation.password.message[0]}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Form.Group controlId='password2'>
            <Form.Label>Comfirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirmation your password'
              value={password2}
              onChange={e => {
                setPassword2(e.target.value);
                setDisabledSubmit(false);
              }}
              isInvalid={!!error?.validation?.password2}
            />
            {error?.validation?.password2 ? (
              <Form.Control.Feedback type='invalid'>
                {error.validation.password2.message[0]}
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
                  <span className='ml-2'> Register</span>
                </>
              ) : (
                'Register'
              )}
            </Button>
          </Form.Group>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
      {/* */}
    </Container>
  );
};

export default RegisterScreen;
