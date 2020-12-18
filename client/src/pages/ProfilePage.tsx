import React from 'react';
import { Col, Row, Accordion, Button, Card } from 'react-bootstrap';

import { RouteComponentProps } from 'react-router-dom';
import FormUpdateUser from '../components/Form/FormUpdateUser';

interface ProfilePageProps extends RouteComponentProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <Row>
      <Col md={3}>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                Update profile
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <FormUpdateUser />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>

      <Col md={9}>
        <h1>Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfilePage;
