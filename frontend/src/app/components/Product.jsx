import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './Rating';

/* eslint-disable  */

const Product = props => {
  const { product } = props;

  return (
    <Card className='my-3 p-3 rounded h-100 overflow-hidden bei-card  '>
      {/* eslint-disable */}
      <LinkContainer
        style={{ cursor: 'pointer' }}
        to={`/product/${product._id}`}
      >
        <Card.Img
          className='bei-card-img'
          src={`${product.image}`}
          variant='top'
        />
      </LinkContainer>
      <Card.Body className='px-0 text-nowrap'>
        <Link
          className='text-dark '
          to={`/product/${product._id}`}
          title={product.name}
        >
          <Card.Title as='div' className=' text-ellipsis'>
            <strong> {product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='lead mb-3'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h5'>{product.price.rupiah}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
