import React from 'react';
import PropTypes from 'prop-types';

import { Breadcrumb } from 'react-bootstrap';
import { useHistory } from 'react-router';

const defaultProps = {
  parentClass: '',
  items: '',
};

const proptypes = {
  parentClass: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

const BreadcrumbContainer = ({ items, parentClass }) => {
  /* eslint-disable */
  const history = useHistory();

  return (
    <Breadcrumb className={`${parentClass}`}>
      {items.map((item, index) => {
        return !item.isActive ? (
          <Breadcrumb.Item
            key={index}
            as='li'
            href={item.href}
            onClick={e => {
              e.preventDefault();
              history.push(item.href);
            }}
          >
            {item.name}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index} active>
            {item.name}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

BreadcrumbContainer.defaultProps = defaultProps;

BreadcrumbContainer.propTypes = proptypes;

export default BreadcrumbContainer;
