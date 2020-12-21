import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getAllUsers } from '../../redux/actions/user/user';
import { RootStore } from '../../redux/store';

interface UsersListProps {}

const UsersList: React.FC<UsersListProps> = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector(
    (state: RootStore) => state.usersList
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
                  <Button variant='link'>Delete</Button>
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
