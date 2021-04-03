import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';

const Home = () => {
  return (
    <>
      <Container
        fluid
        className='border  '
        style={{
          height: '100vh',
        }}
      >
        <Row style={{ height: '100%' }}>
          <Col>
            <Card className='border-0 shadow-none d-flex flex-column h-100 justify-content-center align-items-center '>
              <h1 className='text-dark'>
                Webpack, React and Babel Boilerplate.
              </h1>
              <h3 className='text-dark'>
                Support{' '}
                <a className='text-purple' href='https://getbootstrap.com/'>
                  Bootstrap
                </a>
              </h3>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <div className=''>
        <h1 className=''>Webpack, React and Babel Boilerplate</h1>
        <h3 className=''>
          Support
          Css Modules and Scss
        </h3>
      </div> */}
    </>
  );
};

export default Home;
