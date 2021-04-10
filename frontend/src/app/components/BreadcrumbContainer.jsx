import React from 'react';
import PropTypes from 'prop-types';

import { Breadcrumb } from 'react-bootstrap';
import { useHistory } from 'react-router';

const defaultProps = {
  items: '',
};

const proptypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

const BreadcrumbContainer = ({ items }) => {
  /* eslint-disable */
  const history = useHistory();

  return (
    <Breadcrumb>
      {items.map(item => {
        return !item.isActive ? (
          <Breadcrumb.Item
            key={item.name}
            as='li'
            className=''
            href={item.href}
            onClick={e => {
              e.preventDefault();
              history.push(item.href);
            }}
          >
            {item.name}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={item.name} active>
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
