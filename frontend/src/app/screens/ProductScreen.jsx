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
import formatRupiah from '../utils/formatRupiah';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const id = match.params?.id;
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    let mount = false;
    const fetchProduct = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/product/${id}`,
        });
        mount = true;
        const { data } = response;
        if (mount) {
          data.product.price = formatRupiah(data.product.price);
          data.product.image = require(`../../../public${data.product.image}`).default;

          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    return () => {
      setProduct(null);
    };
  }, [id]);

  return (
    <>
      <Container fluid className='px-0 py-3'>
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
        <Row className='pt-3 '>
          <Col md={12} lg={6} className='pb-5'>
            <Image fluid src={product.image} alt={product.name} />
          </Col>
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
                <span className=' text-primary '>${product.price}</span>
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
                        ${product.price}
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
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
