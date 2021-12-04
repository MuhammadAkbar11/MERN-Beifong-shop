import React from 'react';
/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '@components/Product';
import { listProductByCategoryAction } from '@actions/product.actions';
import Loader from '@components/Loader';
import Paginate from '@components/Paginate';
import BreadcrumbContainer from '@components/BreadcrumbContainer';

const ProductListCategory = props => {
  const { match, history } = props;

  const slug = match.params.slug;
  const pageNumber = match.params?.pageNumber || 1;

  const dispatch = useDispatch();

  const { loading, products, page, pages, error, category } = useSelector(
    state => state.productCategoryList
  );

  let breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Category', isActive: true },
    { name: slug, isActive: true },
  ];

  React.useEffect(() => {
    dispatch(listProductByCategoryAction({ limit: 8, pageNumber, slug }));
    return () => {};
  }, [dispatch, slug, pageNumber]);

  return (
    <>
      <Container fluid className='px-1 px-sm-0 py-3 '>
        <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
        {loading ? (
          <div className='mt-5 '>
            <Loader />
          </div>
        ) : error ? (
          <Row>
            <Col md={6} className='mx-auto pt-4 text-center '>
              <h1 className=' display-3 text-dark mb-3 '>
                <i className=' fa fa-sad-tear   '></i>
              </h1>
              <h3>{error?.message || 'Something went wrong'}</h3>
            </Col>
          </Row>
        ) : (
          <>
            <Row className=' align-items-stretch  '>
              {products.length !== 0 ? (
                <>
                  <Col xs={12}>
                    <h5>Showing products of {category?.name}</h5>
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

                  <h3>No Products</h3>
                </Col>
              )}
            </Row>
            {products.length !== 0 && (
              <section className=' mt-5 d-flex justify-content-center '>
                <Paginate
                  pages={pages}
                  page={page}
                  onChangePage={to => {
                    history.push(`/category/${slug}/page/${to}`);
                  }}
                  // keyword={keyword ? keyword : ''}
                />
              </section>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProductListCategory;
