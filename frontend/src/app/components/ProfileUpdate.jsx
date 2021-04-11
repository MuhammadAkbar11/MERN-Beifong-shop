import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';

const defaultProps = {
  user: {},
};

const proptypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

const ProfileUpdate = props => {
  const { user } = props;

  const [inputsVal, setInputsVal] = React.useState({
    name: user.name,
    oldPassword: '',
    password: '',
    password2: '',
  });

  React.useEffect(() => {
    setInputsVal(prevState => {
      return { ...prevState, name: user.name };
    });
  }, [user]);

  const handleChange = e => {
    const inputName = e.target.name;

    setInputsVal(prevState => ({
      ...prevState,
      [inputName]: e.target.value,
    }));
  };

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

            <Form.Control
              type='text'
              name='email'
              defaultValue={user.email}
              readOnly
              // isValid={touched.lastName && !errors.lastName}
            />
          </Form.Group>
          <Form.Group className='mt-2' controlId='name'>
            <Form.Label className='text-nowrap'>Name</Form.Label>

            <Form.Control
              type='text'
              name='name'
              value={inputsVal.name}
              onChange={handleChange}
              // isValid={touched.lastName && !errors.lastName}
            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className='pl-3 pt-4' md={3}>
          <h6 className='text-primary'>Password</h6>
        </Col>
        <Col className='pt-4' md={9} lg={9}>
          <Form.Group controlId='oldPassword'>
            <Form.Label className='text-nowrap'>Current password</Form.Label>

            <Form.Control
              type='password'
              name='oldPassword'
              value={inputsVal.newPassword}
              onChange={handleChange}
              // isValid={touched.lastName && !errors.lastName}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='text-nowrap'>New password</Form.Label>

            <Form.Control
              type='password'
              name='password'
              value={inputsVal.password}
              onChange={handleChange}
              // isValid={touched.lastName && !errors.lastName}
            />
          </Form.Group>
          <Form.Group controlId='password2'>
            <Form.Label className='text-nowrap'>
              Confirm new password
            </Form.Label>

            <Form.Control
              type='password'
              name='password2'
              value={inputsVal.password2}
              onChange={handleChange}
              // isValid={touched.lastName && !errors.lastName}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className='pl-3 pt-4' md={3}>
          <h6 className='text-primary'>Save Changes</h6>
        </Col>
        <Col className='pt-4' md={9} lg={9}>
          <Button type='submit'>Save Update</Button>
        </Col>
      </Row>
    </>
  );
};

ProfileUpdate.defaultProps = defaultProps;

ProfileUpdate.propTypes = proptypes;

export default ProfileUpdate;
