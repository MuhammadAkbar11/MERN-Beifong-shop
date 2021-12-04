import React from 'react';
import { Pagination } from 'react-bootstrap';

/* eslint-disable */

const Paginate = ({ pages, page, isAdmin = false, onChangePage = null }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map(x => {
          return isAdmin ? (
            <Pagination.Item
              key={x + 1}
              onClick={e => {
                e.preventDefault();
                onChangePage(x + 1);
              }}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={x + 1}
              onClick={e => {
                e.preventDefault();
                onChangePage(x + 1);
              }}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
