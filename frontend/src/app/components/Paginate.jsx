import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* eslint-disable */

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  onClickItem = null,
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => {
          return isAdmin ? (
            <Pagination.Item
              onClick={() => onClickItem(x + 1)}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          ) : (
            <LinkContainer
              key={x + 1}
              to={
                keyword
                  ? `/search/${keyword}/${page}/${x + 1}`
                  : `/products/page/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
