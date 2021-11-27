/* eslint-disable */
import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/product.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import FormContainer from '../components/FormContainer';
import { listCategoriesAction } from '../actions/category.actions';
import { Link } from 'react-router-dom';

const ProductEditScreen = ({ match, history }) => {
  const productID = match.params.id;

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

  const { product, error, loading } = useSelector(
    state => state.productDetails
  );

  const { categories } = useSelector(state => state.categoryList);

  // const { error: errorUpdate, loading: loadingUpdate } = {};
  // useSelector(
  //   state => state.productUpdate
  // );

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
        if (product) {
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
    }
  }, [dispatch, userInfo, product, productID, history]);

  const handleChange = e => {
    const { id: inputId, value } = e.target;

    setInputsValue(prevState => ({
      ...prevState,
      [inputId]: value,
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
  };
  console.log(error);
  return (
    <>
      <Container fluid className='px-0  py-3 h-100 '>
        <BreadcrumbContainer parentClass='ml-n3 mb-5' items={breadcrumbItems} />
        {loading ? (
          <Loader size={40} />
        ) : (
          <FormContainer>
            {error ? (
              <Message variant='danger'>{error?.message}</Message>
            ) : (
              <>
                <h3 className='text-primary'>Edit Product</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product name'
                      value={inputsValue.name}
                      onChange={handleChange}
                      // isInvalid={!!error?.validation?.email}
                    />

                    {/* {error?.validation?.email ? (
      <Form.Control.Feedback type='invalid'>
        {error.validation.email.message[0]}
      </Form.Control.Feedback>
    ) : null} */}
                  </Form.Group>
                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product price'
                      value={inputsValue.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter product brand'
                      value={inputsValue.brand}
                      onChange={handleChange}
                    />
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
                    <Form.Label>count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter product count in stock'
                      value={inputsValue.countInStock}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows={6}
                      onChange={handleChange}
                      value={inputsValue.description}
                    />
                  </Form.Group>
                  <Form.Group className='pt-3'>
                    <Link
                      to='/admin/productlist'
                      className='btn btn-outline-primary '
                    >
                      Cancel
                    </Link>
                    <Button type='submit' className='ml-3 btn btn-primary '>
                      Save Changes
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

export default ProductEditScreen;
