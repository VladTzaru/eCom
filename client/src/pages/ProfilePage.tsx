import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Accordion, Button, Card, Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import FormUpdateUser from '../components/Form/FormUpdateUser';
import { RootStore } from '../redux/store';
import { getAllUserOrders } from '../redux/actions/order/order';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

interface ProfilePageProps extends RouteComponentProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const dispatch = useDispatch();
  const { error, orders, loading } = useSelector(
    (state: RootStore) => state.orderList
  );

  const renderTable = () => {
    if (orders.length === 0) return <p>No orders yet.</p>;
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>OTHER</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <i style={{ color: 'green' }} className='fas fa-check' />
                ) : (
                  <i style={{ color: 'red' }} className='fas fa-times' />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  <i style={{ color: 'green' }} className='fas fa-check' />
                ) : (
                  <i style={{ color: 'red' }} className='fas fa-times' />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='link'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  useEffect(() => {
    dispatch(getAllUserOrders());
  }, [dispatch]);

  return (
    <Row>
      <Col md={4}>
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

      <Col md={8}>
        <h2>Orders</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          renderTable()
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
