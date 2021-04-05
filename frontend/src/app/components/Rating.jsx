import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
  text: '',
};

const proptypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};

const Rating = props => {
  const { value, text } = props;
  /* eslint-disable */

  console.log(typeof value);
  return (
    <div className='rating text-warning    '>
      <span>
        <i
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      {/* 2 */}
      <span>
        <i
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <small className='ml-2'>{text && text}</small>
    </div>
  );
};

Rating.defaultProps = defaultProps;

Rating.propTypes = proptypes;

export default Rating;
