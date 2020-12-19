import React, { useEffect } from 'react';
import CartItemsList from '../components/Cart/CartItemsList';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/store';
import { MatchParamsI, OrderI } from '../customTypes';
import { RouteComponentProps } from 'react-router-dom';
import { getOrderDetails } from '../redux/actions/order/order';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CartOrderSummary from '../components/Cart/CartOrderSummary';
import UserAddress from '../components/User/UserAddress';

interface OrderPageProps extends RouteComponentProps<MatchParamsI> {}

const OrderPage: React.FC<OrderPageProps> = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector(
    (state: RootStore) => state.orderDetails
  );

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, orderId]);

  const orderDetails: OrderI = {
    paymentMethod: order?.paymentMethod,
    taxPrice: order?.taxPrice,
    totalItemsPrice: order?.totalItemsPrice,
    totalPrice: order?.totalPrice,
    shippingPrice: order?.shippingPrice,
    orderItems: order?.orderItems,
    payedAt: order?.payedAt,
    deliveredAt: order?.deliveredAt,
  };

  return loading || !order ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                <span>{order.user.name}</span>
              </p>
              <p>
                <strong>Email: </strong> <span>{order.user.email}</span>
              </p>

              <UserAddress
                showNotification
                deliveredAt={order.deliveredAt}
                isDelivered={order.isDelivered}
                shippingAddress={order.shippingAddress}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Selected: </strong>
                {order.paymentMethod}
              </p>
              {order.isPayed ? (
                <Message variant='success'>Payed on {order.payedAt}</Message>
              ) : (
                <Message heading='Payment status' variant='danger'>
                  Not payed
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              <CartItemsList cartItems={order.orderItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <CartOrderSummary orderDetails={orderDetails} />
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
