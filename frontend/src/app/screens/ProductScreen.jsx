/* eslint-disable */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from 'react-bootstrap';
import Rating from '@components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '@actions/product.actions';
import Loader from '@components/Loader';
import { addToCart } from '@actions/cart.actions';

import ProductListReview from '@components/ProductListReview';
import { Helmet } from 'react-helmet';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = React.useState(1);

  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.productDetails);

  const pageRedirect = useSelector(state => state.redirect);
  const cart = useSelector(state => state.cart);
  let cartAddItemLoading = cart.loading;

  const isProductInCart = cart.cartItems.find(item => {
    return match.params.id === item.product;
  });

  React.useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {};
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, +qty)).then(() => {
      history.push('/cart');
    });
  };

  return (
    <>
      {' '}
      <Helmet>
        <title>Beifong Shop | {product?.name || 'No product found'}</title>
      </Helmet>
      <Container fluid className='px-0 py-3'>
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
        <Row className='pt-3 align-items-stretch  '>
          <Col md={12} lg={6} className={`${!loading ? 'pb-5' : ''}`}>
            {loading || product.image === undefined ? (
              <div
                className='d-flex justify-content-center align-items-cente'
                style={{ height: 200, width: '100%' }}
              >
                <Loader height={200} width={200} />
              </div>
            ) : (
              <Image fluid src={`${product.image}`} alt={product.name} />
            )}
          </Col>
          {!loading ? (
            <>
              <Col md={8} lg={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='border-bottom-0 pb-0'>
                    <h3>{product.name}</h3>
                    <p className='my-0'>{product?.brand}</p>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className='border-bottom-0 pb-1'
                    style={{
                      fontSize: 19,
                    }}
                  >
                    <Rating
                      value={product.rating === undefined ? 0 : product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className='d-block'>
                    <p className=' text-primary mb-2 '>
                      {product.price?.rupiah}
                    </p>
                    <Link
                      className=' badge badge-primary shadow-none '
                      to={`/category/${product.category?.slug}`}
                    >
                      {product?.category?.name}
                    </Link>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description : <br /> {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4} lg={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item className=''>
                      <div className='d-flex flex-wrap justify-content-between'>
                        <div>
                          <span>Price :</span>
                        </div>
                        <div>
                          <strong className=' font-weight-bold '>
                            {product.price?.rupiah}
                          </strong>
                        </div>
                      </div>
                    </ListGroup.Item>

                    <ListGroup.Item className=''>
                      <div className='d-flex justify-content-between'>
                        <div>Status :</div>
                        <div>
                          <strong>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'out of Stock'}
                          </strong>
                        </div>
                      </div>
                    </ListGroup.Item>
                    {!isProductInCart ? (
                      <>
                        {product.countInStock > 0 && (
                          <ListGroup.Item>
                            <div className='d-flex justify-content-between'>
                              <div>Quantity :</div>
                              <div>
                                <Form.Control
                                  size='sm'
                                  as='select'
                                  value={qty}
                                  onChange={e => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    x => {
                                      const key = x + 1;
                                      return (
                                        <option key={key} value={key}>
                                          {key}
                                        </option>
                                      );
                                    }
                                  )}
                                </Form.Control>
                              </div>
                            </div>
                          </ListGroup.Item>
                        )}
                        <ListGroup.Item className=''>
                          <Button
                            onClick={() => addToCartHandler()}
                            className='btn-block bg-gradient-primary '
                            type='button'
                            disabled={
                              product.countInStock === 0 || cartAddItemLoading
                            }
                          >
                            {' '}
                            {cartAddItemLoading
                              ? 'Adding to cart...'
                              : 'Add to cart'}
                          </Button>
                        </ListGroup.Item>
                      </>
                    ) : (
                      <>
                        <ListGroup.Item>
                          <div className='text-left text-primary font-weight-bold'>
                            Already put in the Cart
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Link
                            className='btn btn-primary btn-block'
                            to='/cart'
                          >
                            Go To Cart
                          </Link>
                        </ListGroup.Item>
                      </>
                    )}
                  </ListGroup>
                </Card>
              </Col>
            </>
          ) : (
            <Col md={12} lg={6}>
              <div className='mt-2 h-100  d-flex justify-content-center align-items-center'>
                <Loader height={200} width={200} />
              </div>
            </Col>
          )}
        </Row>
        <ProductListReview product={product} />
      </Container>
    </>
  );
};

export default ProductScreen;
