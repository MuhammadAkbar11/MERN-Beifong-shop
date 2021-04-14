import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* eslint-disable */
const defaultProps = {
  className: '',
  height: 100,
  width: 100,
};

const proptypes = {
  className: PropTypes.string,
  height: PropTypes.any,
  width: PropTypes.any,
};

const Loader = ({ height, width, className }) => {
  return (
    <Spinner
      className={`${className}`}
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
