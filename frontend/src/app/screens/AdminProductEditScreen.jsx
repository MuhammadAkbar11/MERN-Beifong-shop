/* eslint-disable */
import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listProductDetails,
  updateProductAction,
} from '../actions/product.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import FormContainer from '../components/FormContainer';
import { listCategoriesAction } from '../actions/category.actions';
import { Link } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '@constants/product.constants';
import useSingleImageUploader from '../hooks/useSingleImageUploader';

const AdminProductEditScreen = ({ match, history }) => {
  const productID = match.params.id;

  const [disabledBtn, setDisabledBtn] = React.useState(false);
  const [inputsValue, setInputsValue] = React.useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const dispatch = useDispatch();
  const imageUploader = useSingleImageUploader({ defaultImage: null });

  const { product, error, loading } = useSelector(
    state => state.productDetails
  );

  const { categories } = useSelector(state => state.categoryList);

  const { error: errorUpdate, loading: loadingUpdate } = useSelector(
    state => state.productUpdate
  );

  // userInfo
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Products', href: '/admin/productlist' },
    { name: product?.name || '-', isActive: true },
    { name: 'Edit ', isActive: true },
  ];

  React.useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/');
    } else {
      if (!product?.name || product?._id !== productID) {
        dispatch(listProductDetails(productID));
        dispatch(listCategoriesAction());
      } else {
        setInputsValue({
          name: product.name,
          price: product.price?.num,
          image: product.image,
          brand: product.brand,
          category: product.category._id,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [dispatch, userInfo, product, productID, history]);

  React.useEffect(() => {
    if (errorUpdate || loadingUpdate) {
      setDisabledBtn(true);
    } else {
    }

    return () => {
      setDisabledBtn(false);
    };
  }, [errorUpdate, loadingUpdate]);

  const handleChange = e => {
    const { id: inputId, value } = e.target;
    setDisabledBtn(false);
    setInputsValue(prevState => ({
      ...prevState,
      [inputId]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      updateProductAction({
        _id: product._id,
        uploading: imageUploader?.image,
        oldImage: product.image,
        ...inputsValue,
      })
    ).then(() => {
      setDisabledBtn(false);
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(listProductDetails(productID));
      imageUploader.handleReset();
      history.push('/admin/productlist');
    });
  };

  return (
    <>
      <Container fluid className='px-0  py-3 h-100 '>
        <BreadcrumbContainer parentClass='ml-n3 mb-1' items={breadcrumbItems} />
        <Link to='/admin/productlist' className='mb-4 btn btn-light '>
          Back
        </Link>
        {loading ? (
          <Loader size={40} />
        ) : (
          <FormContainer>
            {error ? (
              <div className='mb-3'>
                <Message variant='danger'>{error?.message}</Message>
              </div>
            ) : (
              <>
                <h3 className='text-primary mb-3'>Edit Product</h3>

                {errorUpdate && !errorUpdate.validation && (
                  <div className='mb-3'>
                    <Message variant='danger'>
                      {error?.message || 'Failed to Update'}
                    </Message>
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product name'
                      value={inputsValue.name}
                      onChange={handleChange}
                      isInvalid={!!errorUpdate?.validation?.name}
                    />

                    {errorUpdate?.validation?.name && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.name.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product price'
                      value={inputsValue.price}
                      onChange={handleChange}
                      isInvalid={!!errorUpdate?.validation?.price}
                    />

                    {errorUpdate?.validation?.price && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.price.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product brand'
                      value={inputsValue.brand}
                      onChange={handleChange}
                      isInvalid={!!errorUpdate?.validation?.brand}
                    />

                    {errorUpdate?.validation?.brand && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.brand.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='select'
                      custom
                      onChange={handleChange}
                      defaultValue={product.category._id}
                    >
                      {categories.map(ct => {
                        return (
                          <option value={ct._id} key={ct._id}>
                            {ct.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter product count in stock'
                      value={inputsValue.countInStock}
                      onChange={handleChange}
                      isInvalid={!!errorUpdate?.validation?.countInStock}
                    />

                    {errorUpdate?.validation?.countInStock && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.countInStock.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={6}
                      onChange={handleChange}
                      value={inputsValue.description}
                      isInvalid={!!errorUpdate?.validation?.description}
                    />

                    {errorUpdate?.validation?.description && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.description.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product image url'
                      value={inputsValue.image}
                      onChange={handleChange}
                      disabled={imageUploader.image}
                      // readOnly
                      isInvalid={!!errorUpdate?.validation?.image}
                    />
                    <Form.File
                      id='image-file'
                      label='Chooose File'
                      // disabled={uploading}
                      custom
                      // defaultValue={}
                      className='mt-3'
                      onChange={e => imageUploader.handleFile(e.target.files)}
                    />
                    <div>
                      {imageUploader.image ? (
                        <img
                          width={250}
                          src={imageUploader.image?.url}
                          alt='Product Upload'
                          className=' mt-3'
                        />
                      ) : null}
                    </div>
                    {errorUpdate?.validation?.image && (
                      <Form.Control.Feedback type='invalid'>
                        {errorUpdate.validation.image.message[0]}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className='pt-3'>
                    <Button
                      disabled={disabledBtn}
                      type='submit'
                      className=' btn btn-primary '
                    >
                      {loadingUpdate ? 'Saving...' : '  Save Changes'}
                    </Button>
                  </Form.Group>
                </Form>
              </>
            )}
          </FormContainer>
        )}
      </Container>
    </>
  );
};

export default AdminProductEditScreen;
