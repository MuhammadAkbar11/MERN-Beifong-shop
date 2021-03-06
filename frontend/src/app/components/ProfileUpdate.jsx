import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import {
  userUpdateProfileAction,
  userResetChangePasswordFeedBackAction,
  userChangePasswordAction,
  userResetUpdateProfileFeedBackAction,
} from '@actions/v2/user.actions';
import Loader from './Loader';
import Message from './Message';

const defaultProps = {
  user: {},
};

const proptypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

const updateProfileSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid Email'),
  name: Yup.string().required('Name is required').min(3, 'name to short!'),
});

const updatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Enter your current password'),
  newPassword: Yup.string()
    .required('Enter your new password')
    .min(5, 'password to short'),
  newPassword2: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

const ProfileUpdate = props => {
  const { user } = props;

  const dispatch = useDispatch();

  const { userUpdateProfile, userChangePassword } = useSelector(state => state);

  const { success } = userChangePassword;

  const userProfileFormik = useFormik({
    validationSchema: updateProfileSchema,
    enableReinitialize: true,
    initialValues: {
      email: user.email,
      name: user.name,
    },
    onSubmit: values => {
      dispatch(
        userUpdateProfileAction({ email: values.email, name: values.name })
      );
    },
  });

  const userPasswordFormik = useFormik({
    validationSchema: updatePasswordSchema,
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    },
    onSubmit: values => {
      dispatch(
        userChangePasswordAction(values.oldPassword, values.newPassword)
      );
    },
  });

  React.useEffect(() => {
    document.title = 'Profile | Beifong Shop';
    if (success) {
      userPasswordFormik.resetForm({
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
      });
    }
  }, [success]);

  React.useEffect(() => {
    return () => {
      dispatch(userResetUpdateProfileFeedBackAction());
      dispatch(userResetChangePasswordFeedBackAction());
    };
  }, [dispatch]);

  // console.log( || !userProfileFormik.isValid);

  return (
    <>
      <div>
        <h4 className='text-left'>Profile</h4>
      </div>

      <Row>
        {userUpdateProfile.success && (
          <Col xs={12} className='mt-3'>
            <Message variant='success'>
              {' '}
              {userUpdateProfile.success?.message}
            </Message>
          </Col>
        )}
        {userUpdateProfile.errors && (
          <Col xs={12} className='mt-3'>
            <Message variant='danger'>
              {' '}
              {userUpdateProfile.errors?.message}
            </Message>
          </Col>
        )}
        <Col className='pl-3 pt-4' md={3}>
          <h6 className='text-primary'>Profile</h6>
        </Col>

        <Col className='pt-4' md={9} lg={9}>
          <Form onSubmit={userProfileFormik.handleSubmit}>
            <Form.Group controlId='email'>
              <Form.Label className='text-nowrap'>Email</Form.Label>
              <Row className=' align-self-stretch '>
                <Col sm={8} md={6} lg={8}>
                  <Form.Control
                    type='email'
                    name='email'
                    value={userProfileFormik.values.email}
                    onChange={userProfileFormik.handleChange}
                    isInvalid={!!userProfileFormik.errors.email}
                  />

                  <Form.Control.Feedback type='invalid'>
                    {userProfileFormik.errors.email}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mt-2' controlId='name'>
              <Form.Label className='text-nowrap'>Name</Form.Label>
              <Row className=' align-self-stretch '>
                <Col sm={8} md={6} lg={8}>
                  <Form.Control
                    type='text'
                    name='name'
                    value={userProfileFormik.values.name}
                    onChange={userProfileFormik.handleChange}
                    isInvalid={!!userProfileFormik.errors.name}
                  />

                  <Form.Control.Feedback type='invalid'>
                    {userProfileFormik.errors.name}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className='mt-2'>
              <Button
                type='submit'
                disabled={
                  userUpdateProfile.loading || !userProfileFormik.isValid
                }
                className='d-flex'
              >
                {userUpdateProfile.loading ? (
                  <>
                    <Loader height={15} width={15} />
                    <span className='ml-2'>Update Profile</span>
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <hr />
      <Row className='pt-3'>
        {userChangePassword.success && (
          <Col xs={12}>
            <Message variant='success'> {userChangePassword.message}</Message>
          </Col>
        )}
        {userChangePassword.error && (
          <Col xs={12}>
            <Message variant='danger'>
              {' '}
              {userChangePassword.errorMessage}
            </Message>
          </Col>
        )}
      </Row>
      <Form onSubmit={userPasswordFormik.handleSubmit}>
        <Row>
          <Col className='pl-3 pt-4' md={3}>
            <h6 className='text-primary'>Password</h6>
          </Col>
          <Col className='pt-4' md={9} lg={9}>
            <Form.Group controlId='oldPassword' as={Row}>
              <Col sm={8} md={7} lg={8}>
                <Form.Label className='text-nowrap'>
                  Current password
                </Form.Label>
                <Form.Control
                  type='password'
                  name='oldPassword'
                  value={userPasswordFormik.values.oldPassword}
                  onChange={userPasswordFormik.handleChange}
                  isInvalid={!!userPasswordFormik.errors.oldPassword}
                />
                {userPasswordFormik.errors.oldPassword && (
                  <Form.Control.Feedback type='invalid'>
                    {userPasswordFormik.errors.oldPassword}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>

            <Form.Group controlId='newPassword' as={Row}>
              <Col sm={8} md={7} lg={8}>
                <Form.Label className='text-nowrap'>New Password</Form.Label>

                <Form.Control
                  type='password'
                  name='newPassword'
                  value={userPasswordFormik.values.newPassword}
                  onChange={userPasswordFormik.handleChange}
                  isInvalid={!!userPasswordFormik.errors.newPassword}
                  // isValid={touched.lastName && !errors.lastName}
                />
                {userPasswordFormik.errors.newPassword && (
                  <Form.Control.Feedback type='invalid'>
                    {userPasswordFormik.errors.newPassword}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group controlId='newPassword2' as={Row}>
              <Col sm={8} md={7} lg={8}>
                <Form.Label className='text-nowrap'>
                  Confirm new password
                </Form.Label>

                <Form.Control
                  type='password'
                  name='newPassword2'
                  value={userPasswordFormik.values.newPassword2}
                  onChange={userPasswordFormik.handleChange}
                  isInvalid={!!userPasswordFormik.errors.newPassword2}
                  // isValid={touched.lastName && !errors.lastName}
                />
                {userPasswordFormik.errors.newPassword2 && (
                  <Form.Control.Feedback type='invalid'>
                    {userPasswordFormik.errors.newPassword2}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group>
              <Button
                type='submit'
                disabled={
                  userChangePassword.loading || !userPasswordFormik.isValid
                }
                className='d-flex'
              >
                {userChangePassword.loading ? (
                  <>
                    <Loader height={15} width={15} />
                    <span className='ml-2'>Change password</span>
                  </>
                ) : (
                  'Change password'
                )}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <hr />
    </>
  );
};

ProfileUpdate.defaultProps = defaultProps;

ProfileUpdate.propTypes = proptypes;

export default ProfileUpdate;
