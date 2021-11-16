import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserListAction } from '../actions/user.actions';

/* eslint-disable */

const UserListScreen = () => {
  const dispacth = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  React.useEffect(() => {
    dispacth(getUserListAction());
  }, [dispacth]);

  const deleteHandler = userId => {
    console.log(userId);
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>Failed get users</Message>
      ) : (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
          <tbody>
            {users.length !== 0 ? (
              users.map(user => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>
                      {user?.isAdmin ? (
                        <Badge variant='success'>
                          <i className='fas fa-check'></i>
                        </Badge>
                      ) : (
                        <Badge variant='danger'>
                          <i className='fas fa-times'></i>
                        </Badge>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          gap: '.5rem',
                        }}
                        className=' d-flex  '
                      >
                        <LinkContainer to={`user/${user._id}/edit`}>
                          <Button variant='dark' size='sm'>
                            <i className='fas fa-edit '></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className='fas fa-trash '></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <Message>Users is empty</Message>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
