import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '@components/Product';
import { listProducts } from '@actions/product.actions';
import Loader from '@components/Loader';
import Message from '@components/Message';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import Paginate from '@components/Paginate';
import { Helmet } from 'react-helmet';
/* eslint-disable */
const ProductListScreen = ({ match, history }) => {
  const keyword = match.params?.keyword;
  const pageNumber = match.params?.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, error, loading, page, pages } = productList;

  React.useEffect(() => {
    dispatch(listProducts({ result: 8, keyword, pageNumber }));
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

  const handleChangePagination = to => {
    if (keyword) {
      return history.push(`/search/${keyword}/page/${to}`);
    } else {
      history.push(`/products/page/${to}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Beifong Shop | Products</title>
      </Helmet>
      <Container fluid className='px-1 px-sm-0 py-3 '>
        <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
        <br />
        {loading ? (
          <div className='mt-5 '>
            <Loader />
          </div>
        ) : error ? (
          <div className='mt-4'>
            <Message variant='danger'>
              {error?.message || 'Opps Somethin went wrong'}
            </Message>
          </div>
        ) : (
          <>
            <Row className=' align-items-stretch  '>
              {products.length !== 0 ? (
                <>
                  <Col xs={12}>
                    <h5>
                      {keyword
                        ? `Showing Products for "${keyword}"`
                        : 'Product List'}
                    </h5>
                  </Col>
                  {products.map(product => {
                    /* eslint-disable */
                    const id = product._id;
                    return (
                      <Col
                        className='mb-3'
                        key={id}
                        xs={12}
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
                  onChangePage={handleChangePagination}
                />
              </section>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListScreen;
