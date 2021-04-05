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
import products from '../../../public/products';
import formatRupiah from '../utils/formatRupiah';

const ProductScreen = ({ match }) => {
  const id = match.params?.id;
  const product = products.find(prod => prod._id === id);

  return (
    <>
      <Container fluid className='px-0 py-3'>
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
        <Row className='pt-3 '>
          <Col md={6}>
            <Image fluid src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-bottom-0'>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item className='border-bottom-0'>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <span className=' text-primary-dark '>
                  ${formatRupiah(product.price)}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Description : <br /> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item className=''>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <span className='text-nowrap'>Price :</span>
                    </div>
                    <div>
                      <strong className=' font-weight-bold '>
                        ${formatRupiah(product.price)}
                      </strong>
                    </div>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className=''>
                  <div className='d-flex justify-content-between'>
                    <div>Status :</div>
                    <div>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'out of Stock'}
                      </strong>
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className=''>
                  <Button
                    className='btn-block '
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
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
