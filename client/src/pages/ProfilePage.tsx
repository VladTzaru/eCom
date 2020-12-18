import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { RouteComponentProps } from 'react-router-dom';
import FormUpdateUser from '../components/Form/FormUpdateUser';

interface ProfilePageProps extends RouteComponentProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <Row>
      <Col md={3}>
        <FormUpdateUser />
      </Col>

      <Col md={9}>
        <h1>Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfilePage;
