import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const defaultProps = {
  variant: 'success',
};

const proptypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

/* eslint-disable */

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = defaultProps;

Message.propTypes = proptypes;

export default Message;
