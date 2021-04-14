import React from 'react';
import { Row, Col, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getUserDetailsAction } from '../actions/user.actions';
import BreadcrumbContainer from '../components/BreadcrumbContainer';
import ProfileUpdate from '../components/ProfileUpdate';

/* eslint-disable */
const UserProfileScreen = ({ match, history, location }) => {
  const [breadcrumbItems, setBreadcrumbItems] = React.useState([
    { name: 'Home', href: '/' },
    { name: 'Profile', isActive: true },
    { name: 'Loading...', isActive: true },
  ]);

  const [profile, setProfile] = React.useState({
    name: '',
    email: '',
  });

  const dispatch = useDispatch();

  const { userLogin, userDetails } = useSelector(state => state);
  const { userInfo } = userLogin;
  const { user } = userDetails;

  React.useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user.name) {
      dispatch(getUserDetailsAction('profile'));
    } else {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }

    return () => {};
  }, [dispatch, userInfo, user]);

  React.useEffect(() => {
    const newBrItems = breadcrumbItems.map((br, index) => {
      if (index === 2) {
        br.name = user.name;
      }

      return { ...br };
    });

    setBreadcrumbItems(newBrItems);
  }, [user]);

  const activeClass =
    'border-bottom font-weight-bold text-primary border-primary ';
  return (
    <Container fluid className='px-1 px-sm-0 py-3 h-100 '>
      <BreadcrumbContainer items={breadcrumbItems} parentClass='ml-n3' />
      <Row>
        <Col
          md={3}
          className=' py-3 border-left-0 border-top-0 border-bottom-0   '
        >
          <Row>
            <Col xs={4} md={12} className=' d-flex justify-content-center'>
              {' '}
              <img
                className='rounded-circle'
                src='https://yt3.ggpht.com/ytc/AAUvwngBi2jINBsvvsFt2IykkNSDUKm1iD0lQrSuFNgY=s88-c-k-c0x00ffffff-no-rj'
                alt=''
              />
            </Col>
            <Col xs={8} md={12} className='pt-3 text-md-center'>
              <h4 className='text-dark mb-0'>{profile.name}</h4>
              <small className='text-primary-dark'>{profile.email}</small>
            </Col>
          </Row>
        </Col>
        <Col md={9} className='px-md-3 py-3 '>
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
              <Nav.Link>Update</Nav.Link>
            </LinkContainer>
          </Nav>
          <Container className='pt-5'>
            <Switch>
              <Route exact path={`${match.path}`}>
                <h1>Orders</h1>
              </Route>
              <Route path={`${match.path}/update`}>
                <ProfileUpdate user={profile} />
              </Route>
            </Switch>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfileScreen;
