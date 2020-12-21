import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  return <h1>User lst</h1>;
};

export default UsersList;
