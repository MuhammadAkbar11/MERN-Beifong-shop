import React from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_CREATE_REVIEW_RESET } from '@constants/product.constants';
import {
  createProductReviewAction,
  listProductDetails,
} from '@actions/product.actions';
import Rating from './Rating';

/* eslint-disable */

const ProductListReview = ({ product }) => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [formReview, setFormReview] = React.useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.session);

  const { error: errorReviewCreate } = useSelector(
    state => state.productRewiewCreate
  );

  const submitReviewHandler = e => {
    e.preventDefault();
    dispatch(
      createProductReviewAction({
        _id: product?._id,
        rating,
        comment,
      })
    ).then(() => {
      setRating(0);
      setComment('');
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
      dispatch(listProductDetails(product?._id));
    });
  };

  const isAlreadyReview = product.reviews.find(x => {
    return x.user.toString() === userInfo?._id.toString();
  });

  React.useEffect(() => {
    if (isAlreadyReview) {
      setFormReview(false);
    } else {
      setFormReview(true);
    }
  }, [isAlreadyReview]);

  return (
    <>
      <Row className='my-5 mt-md-2'>
        <Col md={8} lg={6}>
          <h3 className='mb-2'>Reviews</h3>
          <div
            className='d-flex align-items-end '
            style={{
              fontSize: 20,
            }}
          >
            <h1 className='my-0 mb-n1 text-warning font-weight-bold mr-2 '>
              {product.rating}
            </h1>
            <Rating
              value={product.rating === undefined ? 0 : product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>

          <hr />
          {product?.reviews?.length === 0 && (
            <>
              <div className='py-4 text-center'>
                <h5 className='text-spacing-0 text-primary-light font-weight-normal text-capitalize'>
                  No Reviews
                </h5>
              </div>
              <hr />
            </>
          )}
          <ListGroup variant='flush'>
            {product?.reviews.map(rev => {
              return (
                <ListGroup.Item
                  className='pl-0 border-0 py-1 mt-1 '
                  key={rev?._id}
                >
                  <h5 className='mb-1  text-capitalize text-spacing-1 text-dark  font-weight-bold'>
                    {rev?.name}
                  </h5>
                  <div className='d-flex pb-2'>
                    <Rating value={rev.rating} />
                    <p className='my-0 ml-1'>
                      {rev.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p>{rev.comment}</p>
                </ListGroup.Item>
              );
            })}

            <ListGroup.Item className='pl-0 pt-4 border-top '>
              {isAlreadyReview && (
                <Card body className='mb-3'>
                  <Card.Title as='h4' className='text-dark'>
                    Your Review
                  </Card.Title>
                  <div
                    className='d-flex pb-2'
                    style={{
                      fontSize: 18,
                    }}
                  >
                    <Rating value={isAlreadyReview?.rating} />
                    <p className='my-0 ml-1 font-italic'>
                      {isAlreadyReview?.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p>{isAlreadyReview?.comment}</p>
                  <Button
                    variant='link'
                    onClick={e => {
                      setFormReview(true);
                      setRating(isAlreadyReview?.rating);
                      setComment(isAlreadyReview?.comment);
                    }}
                    className='p-0 shadow-none  '
                  >
                    Change Review
                  </Button>
                </Card>
              )}
              {userInfo ? (
                <>
                  {formReview && (
                    <>
                      <h3 className=' text-dark mb-3 '>
                        Write a Customer Review
                      </h3>
                      {errorReviewCreate && (
                        <Alert variant='danger'>
                          {errorReviewCreate?.message ||
                            'Failed to send review'}
                        </Alert>
                      )}
                      <Form onSubmit={submitReviewHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                            as='textarea'
                            rows={3}
                          />
                        </Form.Group>
                        <Button
                          type='submit'
                          disabled={
                            rating === 0 || rating === '' || comment === ''
                          }
                        >
                          Send Review
                        </Button>
                      </Form>
                    </>
                  )}
                </>
              ) : null}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductListReview;
