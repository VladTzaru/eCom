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
import UserPaymentMethod from '../components/User/UserPaymentMethod';

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
  }, [dispatch, orderId, order]);

  const orderDetails: OrderI = {
    _id: order?._id,
    paymentMethod: order?.paymentMethod,
    taxPrice: order?.taxPrice,
    totalItemsPrice: order?.totalItemsPrice,
    totalPrice: order?.totalPrice,
    shippingPrice: order?.shippingPrice,
    orderItems: order?.orderItems,
    paidAt: order?.paidAt,
    deliveredAt: order?.deliveredAt,
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                <span>{order?.user.name}</span>
              </p>
              <p>
                <strong>Email: </strong> <span>{order?.user.email}</span>
              </p>

              <UserAddress
                showNotification
                deliveredAt={order?.deliveredAt}
                isDelivered={order?.isDelivered}
                shippingAddress={order?.shippingAddress}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <UserPaymentMethod
                showNotification
                paidAt={order?.paidAt}
                isPaid={order?.isPaid}
                paymentMethod={order?.paymentMethod}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              <CartItemsList cartItems={order?.orderItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <CartOrderSummary
            taxRate={25}
            isPaid={order?.isPaid}
            switchToPaymentButton
            orderDetails={orderDetails}
          />
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
