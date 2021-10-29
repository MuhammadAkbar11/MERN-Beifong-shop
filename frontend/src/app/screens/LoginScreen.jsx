import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { userLoginAction } from '../actions/user.actions';
import FormContainer from '../components/FormContainer';
import BreadcrumbContainer from '../components/BreadcrumbContainer';

/* eslint-disable */
const LoginScreen = ({ location, history }) => {
  const [breadcrumbItems] = React.useState([
    { name: 'Home', href: '/' },
    { name: 'Login', isActive: true },
  ]);
  const [disabledSubmit, setDisabledSubmit] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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

    dispatch(userLoginAction(email, password));
  };
  return (
    <Container className='px-0 py-3'>
      <BreadcrumbContainer items={breadcrumbItems} />
      <FormContainer>
        <h3 className='text-primary'>Sign in</h3>

        {error && !error.validation && (
          <Message variant='danger'>{error.message}</Message>
        )}

        <Form onSubmit={submitHandler}>
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
                  <span className='ml-2'> Login</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form.Group>
        </Form>
        <Row className='py-3'>
          <Col>
            New customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
      {/* */}
    </Container>
  );
};

export default LoginScreen;
