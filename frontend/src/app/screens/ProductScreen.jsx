import React from 'react';
/* eslint-disable */
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
} from 'react-bootstrap';
import Rating from '@components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/product.actions';
import Loader from '../components/Loader';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.productDetails);

  React.useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {};
  }, [dispatch, match]);

  return (
    <>
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
              <Image fluid src={`/files${product.image}`} alt={product.name} />
            )}
          </Col>
          {!loading ? (
            <>
              <Col md={8} lg={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item className='border-bottom-0'>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item className='border-bottom-0'>
                    <Rating
                      value={product.rating === undefined ? 0 : product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className=' text-primary '>
                      {product.price?.rupiah}
                    </span>
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
                    <ListGroup.Item className=''>
                      <Button
                        className='btn-block bg-gradient-primary '
                        type='button'
                        disabled={product.countInStock === 0}
                      >
                        {' '}
                        Add to cart
                      </Button>
                    </ListGroup.Item>
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
      </Container>
    </>
  );
};

export default ProductScreen;
