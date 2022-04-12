/* eslint-disable */
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history, id }) => {
  const [keyword, setKeyword] = React.useState('');

  const submitHandler = e => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  // React()

  return (
    <>
      <Form onSubmit={submitHandler} inline>
        <Form.Group
          className=' d-flex align-content-center  h-100 '
          controlId={id}
        >
          <Form.Control
            type='text'
            name='q'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder='Search Product'
            className=' h-100 bg-slate-light'
          />

          <Button
            type='submit'
            variant='slate-light'
            className='h-100 py-2 ml-2'
          >
            Search
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default SearchBox;
