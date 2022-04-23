import React from 'react';
import {
  Row,
  Col,
  Container,
  Nav,
  OverlayTrigger,
  Popover,
  Button,
  ListGroup,
  Modal,
  Alert,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getListMyOrdersAction } from '@actions/order.actions';
import BreadcrumbContainer from '@components/BreadcrumbContainer';
import ProfileUpdate from '@components/ProfileUpdate';
import ListMyOrders from '@components/ListMyOrders';
import useSingleImageUploader from '@hooks/useSingleImageUploader';
import Loader from '@components/Loader';
import { Helmet } from 'react-helmet';
import {
  userGetProfileAction,
  userUploadPictureAction,
} from '@actions/v2/user.actions';

/* eslint-disable */
const UserProfileScreen = ({ match, history, location }) => {
  const btnPopoverRef = React.useRef(null);
  const fileRef = React.useRef(null);

  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);

  const [modalUploadImage, setModalUploadImage] = React.useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = React.useState([
    { name: 'Home', href: '/' },
    { name: 'Profile', isActive: true },
    { name: 'Loading...', isActive: true },
  ]);

  const [profile, setProfile] = React.useState({
    name: '',
    email: '',
    image: '',
  });

  const dispatch = useDispatch();
  const imageUploader = useSingleImageUploader({ defaultImage: null });

  const { userProfile } = useSelector(state => state);

  const { user } = userProfile;

  const myOrders = useSelector(state => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

  React.useEffect(() => {
    if (!user.name) {
      dispatch(userGetProfileAction());
      dispatch(getListMyOrdersAction());
    } else {
      setProfile({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }

    return () => {};
  }, [dispatch, user]);

  React.useEffect(() => {
    const newBrItems = breadcrumbItems.map((br, index) => {
      if (index === 2) {
        br.name = user.name;
      }
      return { ...br };
    });

    setBreadcrumbItems(newBrItems);
  }, [user]);

  const handleCloseModalUpload = () => setModalUploadImage(false);
  const handleShowModalUpload = () => setModalUploadImage(true);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const uploadingPhoto = await dispatch(
        userUploadPictureAction({
          _id: user._id,
          uploading: imageUploader.image,
          oldImage: profile.image,
        })
      );
      setUploading(false);
      handleCloseModalUpload();
      imageUploader.handleReset();
      history.push('/profile/update');
    } catch (error) {
      console.log(error);
      setUploadError({
        type: 'danger',
        message: 'Failed to upload image',
      });
      setUploading(false);

      imageUploader.handleReset();
    }
  };

  const activeClass =
    'border-bottom font-weight-bold text-primary border-primary ';
  return (
    <>
      <Helmet>
        <title>Beifong Shop | Profile</title>
      </Helmet>
      <Container fluid className='px-1 px-sm-0 py-3 h-100 '>
        <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
        <Row>
          <Col
            xs={12}
            md={3}
            lg={2}
            className=' py-3 border-left-0 border-top-0 border-bottom-0   '
          >
            <p className='mt-2 mb-4 text-dark'>Profile Picture</p>
            <Row className='profile-picture'>
              <Col
                xs={12}
                sm={4}
                md={12}
                className='profile-picture-img  mx-auto '
              >
                <div className='profile-picture-img-wrapper'>
                  <img
                    className='  rounded-circle '
                    src={profile?.image}
                    style={{
                      objectFit: 'cover',
                    }}
                    onClick={() => btnPopoverRef.current.click()}
                  />
                  <div className='profile-pricture-img-overlay'>
                    <OverlayTrigger
                      trigger='click'
                      placement='bottom'
                      overlay={
                        <Popover id='popover-basic'>
                          <Popover.Content className='p-0'>
                            {/* <> */}
                            <ListGroup>
                              <ListGroup.Item
                                action
                                onClick={() => {
                                  btnPopoverRef.current.click();
                                  handleShowModalUpload();
                                }}
                              >
                                Upload a photo
                              </ListGroup.Item>
                            </ListGroup>
                            {/* </> */}
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button
                        ref={btnPopoverRef}
                        style={{
                          bottom: 0,
                          left: 0,
                        }}
                        // className=' position-absolute '

                        size='sm'
                        variant='primary'
                      >
                        <i className='fas fa-pencil-alt mr-2'></i> Edit
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={8} md={12} className='pt-3 text-md-center'>
                <h4 className='text-dark mb-0'>{profile.name}</h4>
                <small className='text-primary-dark'>{profile.email}</small>
              </Col>
            </Row>
          </Col>
          <Col md={9} lg={10} className='px-md-3 py-3 '>
            <Nav className='justify-content-start' activeKey='/home'>
              <LinkContainer
                to={`${match.path}`}
                className={`${
                  location.pathname === '/profile'
                    ? activeClass
                    : ' text-primary-light'
                } mx-2`}
              >
                <Nav.Link>Order</Nav.Link>
              </LinkContainer>

              <LinkContainer
                to={`${match.path}/update`}
                className={`${
                  location.pathname === '/profile/update'
                    ? activeClass
                    : ' text-primary-light'
                } mx-2`}
              >
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav>
            <Container className='pt-5'>
              <Switch>
                <Route exact path={`${match.path}`}>
                  <ListMyOrders
                    orders={orders}
                    errors={errorOrders}
                    loading={loadingOrders}
                  />
                </Route>
                <Route path={`${match.path}/update`}>
                  <ProfileUpdate user={profile} />
                </Route>
              </Switch>
            </Container>
          </Col>
        </Row>
      </Container>
      <Modal show={modalUploadImage} onHide={handleCloseModalUpload} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload User Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-4'>
          {uploadError && (
            <Alert
              variant='danger'
              dismissible
              onClose={() => setUploadError(null)}
            >
              {uploadError?.message}
            </Alert>
          )}
          {uploading ? (
            <div className='d-flex justify-content-center'>
              <Loader />
            </div>
          ) : (
            <>
              <div className='d-flex justify-content-center'>
                {imageUploader.image ? (
                  <img
                    style={{
                      cursor: 'pointer',
                    }}
                    width={200}
                    src={imageUploader?.image?.url}
                    alt='user profile'
                    className='mx-auto'
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  />
                ) : (
                  <>
                    <p>No file chosen</p>
                  </>
                )}
              </div>
              <div className='mt-2 w-100 text-center pt-3'>
                <input
                  type='file'
                  className='d-none'
                  ref={fileRef}
                  onChange={e => imageUploader.handleFile(e.target.files)}
                />
                <Button
                  variant='outline-primary'
                  size='sm'
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  <i className='fas fa-camera mr-2 '></i>
                  {imageUploader.image ? 'Change photo' : 'Upload photo'}
                </Button>
                {imageUploader.image && (
                  <Button size='sm' className='ml-2' onClick={handleUpload}>
                    <i className='fas fa-upload mr-2 '></i>
                    <span>Upload</span>
                  </Button>
                )}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfileScreen;
