import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  className: '',
  as: 'span',
};

const proptypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

const FormatRupiah = ({ as, value, className, ...rest }) => {
  const formated = value.toLocaleString('id', {
    style: 'currency',
    currency: 'IDR',
  });
  const props = rest;
  const Tag = as;
  return (
    /* eslint-disable */
    <Tag className={className} {...props}>
      {formated}
    </Tag>
  );
};

FormatRupiah.defaultProps = defaultProps;

FormatRupiah.propTypes = proptypes;

export default FormatRupiah;
