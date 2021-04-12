import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useBeiForm from '../hooks/useBeiForm';

const defaultProps = {
  user: {},
};
s;

const proptypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

const nameSchema = Yup.string().required('Enter yourname').min(3, 'To short');

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

  const nameForm = useBeiForm({
    validationSchema: nameSchema,
    initialValues: 'Loading..',
    onSubmit: values => {
      console.log(values);
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
      console.log(values);
    },
  });

  React.useEffect(() => {
    nameForm.setInitValues(user.name);
  }, [user]);

  return (
    <>
      <div>
        <h4 className='text-left'>Update Profile</h4>
      </div>
      <Row>
        <Col className='pl-3 pt-4' md={3}>
          <h6 className='text-primary'>Profile</h6>
        </Col>
        <Col className='pt-4' md={9} lg={9}>
          <Form.Group controlId='email'>
            <Form.Label className='text-nowrap'>Email</Form.Label>

            <Row>
              <Col sm={8} md={6} lg={8}>
                <Form.Control
                  type='text'
                  name='email'
                  defaultValue={user.email}
                  readOnly
                  // isValid={touched.lastName && !errors.lastName}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form onSubmit={nameForm.handleSubmit}>
            <Form.Group className='mt-2' controlId='name'>
              <Form.Label className='text-nowrap'>Name</Form.Label>
              <Row className=' align-self-stretch '>
                <Col sm={8} md={6} lg={8}>
                  <Form.Control
                    type='text'
                    name='name'
                    value={nameForm.values}
                    onChange={nameForm.handleChange}
                    // isValid={name.isChange}
                    isInvalid={!!nameForm.errors}
                  />

                  <Form.Control.Feedback type='invalid'>
                    {nameForm.errors}
                  </Form.Control.Feedback>
                </Col>
                <Col
                  sm={4}
                  md={6}
                  lg={4}
                  className=' d-flex align-items-stretch'
                >
                  {nameForm.isChanges && (
                    <>
                      <Button size='sm' type='submit'>
                        Save
                      </Button>{' '}
                      <Button
                        type='button'
                        onClick={nameForm.handleCancel}
                        size='sm'
                        variant='outline-primary ml-1'
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <hr />

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
                  !userPasswordFormik.isValid || userPasswordFormik.isSubmitting
                }
              >
                Update password
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
