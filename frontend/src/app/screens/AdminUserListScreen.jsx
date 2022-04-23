import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Table, Button, Badge, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAction,
  // getUserListAction,
  resetUserListAlertAction,
} from '@actions/user.actions';
import {
  // deleteUserAction,
  getUserListAction,
  // resetUserListAlertAction,
} from '@actions/v2/user.actions';
import Message from '@components/Message';
import Loader from '@components/Loader';
import BreadcrumbContainer from '@components/BreadcrumbContainer';

/* eslint-disable */

const AdminUserListScreen = ({ history }) => {
  const breadcrumbItems = [
    { name: 'Administrator', href: '/admin' },
    { name: 'Users', isActive: true },
  ];

  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const dispacth = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  const userListAlert = useSelector(state => state.userListAlert);

  const { loading: loadingDelete } = useSelector(state => state.userDelete);

  const { userInfo } = useSelector(state => state.session);

  React.useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispacth(getUserListAction());
    } else {
      history.push('/');
    }
  }, [dispacth, userInfo, history]);

  React.useEffect(() => {
    if (userListAlert && userListAlert.open) {
      setTimeout(() => {
        dispacth(resetUserListAlertAction());
      }, 6000);
    }

    return () => {
      setSelectedUser(null);
    };
  }, [userListAlert]);

  const deleteHandler = () => {
    // console.log(userId);
    if (selectedUser) {
      return dispacth(deleteUserAction(selectedUser._id)).then(() => {
        setConfirmDelete(false);
        setSelectedUser(null);
        dispacth(getUserListAction());
      });
    }
    setConfirmDelete(false);
  };

  return (
    <Container fluid className='px-0  py-3 h-100 '>
      <BreadcrumbContainer parentClass='ml-n3' items={breadcrumbItems} />
      <h1>Users</h1>
      {userListAlert && userListAlert.open && (
        <div className='py-3'>
          <Alert variant={userListAlert.type}>{userListAlert.message}</Alert>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.message || error?.errors?.message || 'Something went wrong'}
        </Message>
      ) : (
        <Table responsive striped bordered hover size='sm'>
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
                          onClick={() => {
                            setConfirmDelete(true);
                            setSelectedUser(user);
                          }}
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

      <Modal
        centered
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDelete ? (
            <div className='py-3'>
              <Loader />
            </div>
          ) : (
            <>
              <h4
                style={{
                  letterSpacing: 0,
                  textTransform: 'none',
                }}
                className='text-spacing-0 font-weight-normal '
              >
                Are you sure want to delete {selectedUser?.name} user?
              </h4>
              <div className='d-flex justify-content-end mt-4 '>
                <Button
                  variant='secondary'
                  onClick={() => setConfirmDelete(false)}
                >
                  Close
                </Button>
                <Button
                  variant='danger'
                  className='ml-2'
                  onClick={() => deleteHandler()}
                >
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminUserListScreen;
