import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '@components/Product';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    /* eslint-disable */

    const fetchProducts = async () => {
      try {
        const { request, data } = await axios({
          method: 'GET',
          url: '/api/products',
        });

        setProducts(data.products);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <>
      {' '}
      <br />
      <br />
      <h1>Latets Products</h1>
      <Row className=' align-items-stretch '>
        {products.map(product => {
          /* eslint-disable */
          const id = product._id;
          return (
            <Col className='mb-3' key={id} xs={6} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
