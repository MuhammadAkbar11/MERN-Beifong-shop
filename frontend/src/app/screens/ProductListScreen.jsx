import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '@components/Product';
import { listProducts } from '../actions/product.actions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import Paginate from '../components/Paginate';
/* eslint-disable */
const ProductListScreen = ({ match }) => {
  const keyword = match.params?.keyword;
  const pageNumber = match.params?.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, error, loading, page, pages } = productList;

  React.useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }));
    return () => {};
  }, [dispatch, keyword, pageNumber]);

  let breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', isActive: true },
    { name: 'Search', isActive: true },
    { name: keyword, isActive: true },
  ];

  if (keyword) {
    breadcrumbItems.splice(1, 1);
  } else {
    breadcrumbItems.splice(2, 1);
    breadcrumbItems.splice(-1, 1);
    if (pageNumber > 1) {
      breadcrumbItems[1].isActive = false;
      breadcrumbItems[1].href = '/products';
      breadcrumbItems = [
        ...breadcrumbItems,
        { name: 'Page', isActive: true },
        { name: pageNumber, isActive: true },
      ];
    }
  }

  return (
    <Container fluid className='px-1 px-sm-0 py-3 '>
      <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
      <br />
      {loading ? (
        <div className='mt-5 '>
          <Loader />
        </div>
      ) : error ? (
        <div className='mt-4'>
          <Message variant='danger'>{error}</Message>
        </div>
      ) : (
        <>
          <Row className=' align-items-stretch  '>
            {products.length !== 0 ? (
              <>
                <Col xs={12}>
                  <h5>
                    Showing {products.length} items{' '}
                    {keyword && `for "${keyword}"`}
                  </h5>
                </Col>
                {products.map(product => {
                  /* eslint-disable */
                  const id = product._id;
                  return (
                    <Col
                      className='mb-3'
                      key={id}
                      xs={6}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <Product product={product} />
                    </Col>
                  );
                })}
              </>
            ) : (
              <Col md={6} className='mx-auto pt-4 text-center '>
                <h1 className=' display-3 text-dark mb-3 '>
                  <i className=' fa fa-sad-tear   '></i>
                </h1>
                {keyword && !pageNumber ? (
                  <h3>Can't find Product with "{keyword}"</h3>
                ) : (
                  <h3>No Products</h3>
                )}
              </Col>
            )}
          </Row>
          {products.length !== 0 && (
            <section className=' mt-5 d-flex justify-content-center '>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </section>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;
