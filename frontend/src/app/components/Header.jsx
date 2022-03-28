import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router';
import { userLogout } from '@actions/user.actions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.session);
  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const totalCart =
    cartItems.length !== 0
      ? cartItems.reduce((acc, item) => acc + item.qty, 0)
      : 0;

  const logoutHandler = e => {
    e.preventDefault();

    dispatch(userLogout());
  };

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              {' '}
              <span className='text-primary'>Bei Fong Shop</span>{' '}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <div className='mx-auto d-none d-md-block'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-shopping-cart mr-1' />
                  Cart ({totalCart})
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <>
                        <i className='fa fa-user-alt'> </i> {userInfo.name}
                      </>
                    }
                    alignRight
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        {' '}
                        <i className='fa fa-user-alt fa-fw mr-2' />
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className='fa fa-sign-out-alt fa-fw mr-2' />
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user mr-1' />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <>
                      <i className='fas fa-fw fa-tachometer-alt ' />{' '}
                      Administrator
                    </>
                  }
                  alignRight
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>
                      <i className='fa fa-users  fa-fw mr-2' />
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>
                      <i className='fas fa-box mr-2 fa-fw' />
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/categorylist'>
                    <NavDropdown.Item>
                      <i className='fas fa-layer-group mr-2 fa-fw' />
                      Categories
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>
                      <i className='fas fa-shopping-bag mr-2 fa-fw' />
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <div className='mx-auto d-block d-md-none mt-2'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
