import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const defaultProps = {
  height: 100,
  width: 100,
};
/* eslint-disable */
const proptypes = {
  height: PropTypes.any,
  width: PropTypes.any,
};

const Loader = ({ height, width }) => {
  return (
    <Spinner
      className='my-2'
      variant='primary-light'
      animation='border'
      role='status'
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = defaultProps;

Loader.propTypes = proptypes;

export default Loader;
