import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import formatRupiah from '../utils/formatRupiah';

const defaultProps = {
  product: {},
};

const proptypes = {
  product: PropTypes.objectOf(PropTypes.object),
};

const Product = props => {
  const { product } = props;
  const price = formatRupiah(product.price);
  return (
    <Card className='my-3 p-3 rounded h-100 overflow-hidden  '>
      {/* eslint-disable */}
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body className='px-0 text-nowrap '>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div' className=' text-ellipsis'>
            <strong> {product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text>
          <div className='my-3'>
            {product.rating} from {product.numReviews}
          </div>
        </Card.Text>
        <Card.Text as='h5'>{price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.defaultProps = defaultProps;

Product.propTypes = proptypes;

export default Product;
