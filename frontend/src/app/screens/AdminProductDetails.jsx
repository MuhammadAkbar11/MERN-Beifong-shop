import React from 'react';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetails } from '@actions/product.actions';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import Loader from '@components/Loader';
import Rating from '@components/Rating';

/* eslint-disable */

const AdminProductDetails = ({ match, history }) => {
  // const [qty]
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.productDetails);
  const { userInfo } = useSelector(state => state.session);
  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProductDetails(match.params.id));
    } else {
      history.push('/');
    }
  }, [dispatch, match, userInfo, history]);

  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Products', href: '/admin/productlist' },
    { name: product?.name || '-', isActive: true },
  ];

  return (
    <Container fluid className='px-0 py-3'>
      <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
      <Link to='/admin/productlist' className='btn btn-light'>
        Go Back
      </Link>
      <Row className='pt-3 align-items-stretch  '>
        {/* {loading ? } */}
        <Col md={6} lg={5} className={`${!loading && 'pb-5'}`}>
          {loading || product.image === undefined ? (
            <div
              className='d-flex justify-content-center align-items-cente'
              style={{ height: 200, width: '100%' }}
            >
              <Loader height={200} width={200} />
            </div>
          ) : (
            <Image fluid src={`${product.image}`} alt={product.name} />
          )}
        </Col>
        {!loading ? (
          <>
            <Col md={8} lg={6}>
              <ListGroup variant='flush'>
                {/* <ListGroup.Item className='pt-0 border-bottom-0'>
                  <Link className='btn btn-sm btn-primary'>
                    <i className=' fa fa-edit mr-2 ' />
                    Edit{' '}
                  </Link>
                </ListGroup.Item> */}
                <ListGroup.Item className='border-top-0 border-bottom-0 pb-0'>
                  <div className='d-flex'>
                    <h3>{product.name} </h3>
                    <Link
                      className='mt-n1 ml-2 text-slate '
                      to={`/admin/product/${product?._id}/edit`}
                    >
                      <i className='fas fa-edit'></i>
                    </Link>
                  </div>
                  <p className='my-0'>{product?.brand}</p>
                </ListGroup.Item>
                <ListGroup.Item
                  className='border-bottom-0 pb-1'
                  style={{
                    fontSize: 22,
                  }}
                >
                  <Rating
                    value={product.rating === undefined ? 0 : product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='d-block'>
                  <h4 className=' text-spacing-0 text-capitalize text-primary mb-2 '>
                    {product.price?.rupiah}
                  </h4>
                  <div className='d-flex align-items-center justify-content-start'>
                    Category :{' '}
                    <h6 className='my-0 ml-2 font-weight-bold'>
                      {product?.category?.name}
                    </h6>{' '}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description : <br /> {product.description}
                </ListGroup.Item>
              </ListGroup>
              <Card className='mt-5'>
                <ListGroup variant='flush'>
                  <ListGroup.Item className=''>
                    <div className='d-flex flex-wrap justify-content-between'>
                      <div>
                        <span>Price :</span>
                      </div>
                      <div>
                        <strong className=' font-weight-bold '>
                          {product.price?.rupiah}
                        </strong>
                      </div>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className=''>
                    <div className='d-flex justify-content-between'>
                      <div>Stock :</div>
                      <div>
                        <strong>{product.countInStock}</strong>
                      </div>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className=''>
                    <div className='d-flex justify-content-between'>
                      <div>Sold out :</div>
                      <div>
                        <strong>{product.soldOut}</strong>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </>
        ) : (
          <Col md={12} lg={6}>
            <div className='mt-2 h-100  d-flex justify-content-center align-items-center'>
              <Loader height={200} width={200} />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AdminProductDetails;
