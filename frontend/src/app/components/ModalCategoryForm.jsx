/* eslint-disable */
import React from 'react';
import { Badge, Button, Col, Form, Modal } from 'react-bootstrap';
import Loader from './Loader';

const ModalCategoryForm = props => {
  const {
    modal: { open, isEdit },
    error,
    category,
    onHide,
    onSubmit,
    loading,
  } = props;

  const [values, setValues] = React.useState({
    isEdit,
    categoryID: '',
    name: '',
    slug: '',
    icon: '',
  });

  const handleResetForm = () => {
    setValues({ isEdit, categoryID: '', name: '', slug: '', icon: '' });
  };

  React.useEffect(() => {
    if (open) {
      if (isEdit) {
        setValues({
          isEdit,
          categoryID: category?._id,
          name: category?.name,
          slug: category?.slug,
          icon: category?.icon,
        });
      } else {
        handleResetForm();
      }
    }

    return () => {
      handleResetForm();
    };
  }, [isEdit]);

  const handleChange = e => {
    const { id, value } = e.target;
    setValues(prevSt => ({
      ...prevSt,
      [id]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Modal centered show={open} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? `Edit ${category?.name}` : 'Create'} Category{' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter '
              value={values.name}
              onChange={handleChange}
              isInvalid={!!error?.validation?.name}
            />

            {error?.validation?.name ? (
              <Form.Control.Feedback type='invalid'>
                {error?.validation.name.message[0]}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Form.Group controlId='slug'>
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter slug'
              value={values.slug}
              onChange={handleChange}
              isInvalid={!!error?.validation?.slug}
            />

            {error?.validation?.slug ? (
              <Form.Control.Feedback type='invalid'>
                {error?.validation.slug.message[0]}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Form.Group controlId='icon'>
            <Form.Label>Icon</Form.Label>
            <Form.Row>
              <Col xs={10}>
                <Form.Control
                  type='text'
                  placeholder='Enter icon'
                  value={values.icon}
                  onChange={handleChange}
                  isInvalid={!!error?.validation?.icon}
                />
              </Col>
              <Col
                xs={2}
                className='d-flex align-items-center justify-content-center'
              >
                <Badge variant='primary' size='lg' className='p-3'>
                  {values.icon !== '' ? (
                    <i className={`fa-fw ${values.icon}`}></i>
                  ) : (
                    <i className={`fa-fw fas fa-question`}></i>
                  )}
                </Badge>
              </Col>
            </Form.Row>

            {error?.validation?.icon ? (
              <Form.Control.Feedback type='invalid'>
                {error?.validation.icon.message[0]}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Button
              type='submit'
              variant='primary'
              className=' d-flex align-items-center '
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader width={11} height={11} />{' '}
                  <span className='ml-2'>{isEdit ? `Edit` : 'Create'} </span>
                </>
              ) : isEdit ? (
                'Edit'
              ) : (
                'Create'
              )}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ModalCategoryForm.defaultProps = {
  error: {},
  category: {},
};

export default ModalCategoryForm;
