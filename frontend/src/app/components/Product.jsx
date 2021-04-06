import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Rating from './Rating';
import formatRupiah from '../utils/formatRupiah';

const defaultProps = {
  product: {},
};

const proptypes = {
  product: PropTypes.objectOf(PropTypes.object),
};

const Product = props => {
  const { product } = props;
  /* eslint-disable  */
  const imageSrc = require(`../../../public${product.image}`).default;
  // const imageSrc = `../../../public${product.image}`;
  const price = formatRupiah(product.price);
  return (
    <Card className='my-3 p-3 rounded h-100 overflow-hidden  '>
      {/* eslint-disable */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={imageSrc} variant='top' />
      </Link>
      <Card.Body className='px-0 text-nowrap '>
        <Link
          className='text-dark '
          to={`/product/${product._id}`}
          title={product.name}
        >
          <Card.Title as='div' className=' text-ellipsis'>
            <strong> {product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h5'>{price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.defaultProps = defaultProps;

Product.propTypes = proptypes;

export default Product;
