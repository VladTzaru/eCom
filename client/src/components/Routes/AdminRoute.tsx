import React, { FunctionComponent, ComponentClass } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux/store';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

interface AdminRouteProps {
  path: string;
  component:
    | FunctionComponent<RouteComponentProps>
    | ComponentClass<RouteComponentProps>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ component, ...props }) => {
  const { userDetails } = useSelector((state: RootStore) => state.user);
  return userDetails && userDetails.isAdmin ? (
    <Route {...props} component={component} />
  ) : (
    <div className='text-center'>
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to access this page.</p>
      <LinkContainer to='/'>
        <Button variant='primary'>Go home</Button>
      </LinkContainer>
    </div>
  );
};

export default AdminRoute;
