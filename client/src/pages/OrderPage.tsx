import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import CartItemsList from '../components/Cart/CartItemsList';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/store';
import { MatchParamsI, OrderI } from '../customTypes';
import { RouteComponentProps } from 'react-router-dom';
import { getOrderDetails, payOrder } from '../redux/actions/order/order';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CartOrderSummary from '../components/Cart/CartOrderSummary';
import UserAddress from '../components/User/UserAddress';
import UserPaymentMethod from '../components/User/UserPaymentMethod';

interface OrderPageProps extends RouteComponentProps<MatchParamsI> {}

const OrderPage: React.FC<OrderPageProps> = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const { loading, error, order } = useSelector(
    (state: RootStore) => state.orderDetails
  );
  const {
    loading: loadingPaid,
    success: successPaid,
    error: errorPaid,
  } = useSelector((state: RootStore) => state.orderPaid);

  const successPaymentHandler = (paymentResult: object): void => {
    dispatch(payOrder(order?._id, paymentResult));
  };

  useEffect(() => {
    const addPayPalScript = async (): Promise<void> => {
      const { data: clientId } = await axios.get<string>('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPaid) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPaid, order]);

  const orderDetails: OrderI = {
    paymentMethod: order?.paymentMethod,
    taxPrice: order?.taxPrice,
    totalItemsPrice: order?.totalItemsPrice,
    totalPrice: order?.totalPrice,
    shippingPrice: order?.shippingPrice,
    orderItems: order?.orderItems,
    paidAt: order?.paidAt,
    deliveredAt: order?.deliveredAt,
  };

  return loading || successPaid ? (
    <Loader />
  ) : error || errorPaid ? (
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
                payedAt={order?.paidAt}
                isPayed={order?.isPaid}
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
          <CartOrderSummary switchToPaymentButton orderDetails={orderDetails} />
          {!order?.isPaid && (
            <ListGroup.Item>
              {loadingPaid && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={order?.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </ListGroup.Item>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
