import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footer '>
      <Container>
        <Row>
          <Col md={6} lg={3} className='mb-md-0 mb-4'>
            <h2 className='footer-heading'>
              <Link to='/' className='logo'>
                Beifong Shop
              </Link>
            </h2>
            <div>
              <p className='mb-2'>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
              <Link className='btn btn-link p-0 shadow-none' to='/about'>
                read more <i className='fas fa-arrow-right' />
              </Link>
            </div>
          </Col>
          <Col md={6} lg={3} className='mb-md-0 mb-4'>
            <div>
              <h2 className='footer-heading'>Categories</h2>
              <ul className='list-unstyled text-light'>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Buy &amp; Sell
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Merchant
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Giving back
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Help &amp; Support
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} lg={3} className='mb-md-0 mb-4'>
            <div>
              <h2 className='footer-heading'>Links</h2>
              <ul className='list-unstyled text-light'>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Buy &amp; Sell
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Merchant
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Giving back
                  </a>
                </li>
                <li>
                  <a href='/#' className='py-1 d-block'>
                    Help &amp; Support
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} lg={3} className='mb-md-0 mb-4'>
            <div>
              <h2 className='footer-heading'>Subcribe</h2>
              <Form action='/#' className='subscribe-form'>
                <Form.Group className=' d-flex flex-row  align-content-stretch align-items-stretch '>
                  <Form.Control
                    type='text'
                    className=' shadow-none bg-dark h-auto '
                    placeholder='Enter email address'
                  />
                  <Button
                    type='submit'
                    variant='slate'
                    className=' shadow-none h-auto '
                  >
                    <span className='sr-only'>Submit</span>
                    <i className='fas fa-paper-plane' />
                  </Button>
                </Form.Group>
              </Form>
            </div>
            <div>
              <h2 className='footer-heading mt-5'>Follow us</h2>
              <ul className='footer-social p-0'>
                <li>
                  <a href='/#' title='Twitter' className='bg-dark'>
                    <i className='fab fa-twitter' />
                  </a>
                </li>
                <li>
                  <a href='/#' title='Facebook' className='bg-dark'>
                    <i className='fab fa-facebook' />
                  </a>
                </li>
                <li>
                  <a href='/#' title='Instagram' className='bg-dark'>
                    <i className='fab  fa-instagram' />
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col className='text-center py-3'>Copyright &copy; Beifong shop</Col>
        </Row>
      </Container>
      <div className='w-100 mt-5 border-top py-5'>
        <Container>
          <Row>
            <Col md={6} lg={8}>
              <p className='copyright'>
                Copyright © All rights reserved | This website is made by
                <a
                  href='https://muhammad-akbar.herokuapp.com/'
                  className='pl-1 text-slate'
                  target='_blank'
                  rel='noreferrer'
                >
                  Muhammad Akbar
                </a>
              </p>
            </Col>
            <Col md={6} lg={8}>
              <p className='mb-0 list-unstyled'>
                <a className='mr-md-3' href='/#'>
                  Terms
                </a>
                <a className='mr-md-3' href='/#'>
                  Privacy
                </a>
                <a className='mr-md-3' href='/#'>
                  Compliances
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
