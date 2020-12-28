import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { deleteUser, getAllUsers } from '../../redux/actions/user/user';
import { RootStore } from '../../redux/store';

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector(
    (state: RootStore) => state.usersList
  );
  const { userDetails } = useSelector((state: RootStore) => state.user);

  const handleDeleteUser = (id: string | undefined): void => {
    if (id) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    if (userDetails && userDetails.isAdmin) {
      dispatch(getAllUsers());
    }
  }, [dispatch, userDetails]);

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'Subscriber'}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='link'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant='link'
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersList;
