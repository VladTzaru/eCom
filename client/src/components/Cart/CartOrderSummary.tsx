import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { OrderI } from '../../customTypes';
import { createOrder, payOrder } from '../../redux/actions/order/order';
import Loader from '../Loader';
import { RootStore } from '../../redux/store';

interface CartOrderSummaryProps {
  orderDetails: OrderI;
  taxRate?: number;
  isPaid?: boolean;
  switchToPaymentButton?: boolean;
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  orderDetails,
  taxRate,
  isPaid,
  switchToPaymentButton = false,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootStore) => state.orderPaid
  );

  const {
    _id,
    orderItems,
    paymentMethod,
    shippingAddress,
    totalItemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = orderDetails;

  const order: OrderI = {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
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

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const addPayPalButton = () => {
    return (
      !isPaid && (
        <ListGroup.Item>
          {loading && <Loader />}
          {!sdkReady ? (
            <Loader />
          ) : (
            <PayPalButton
              amount={order?.totalPrice}
              onSuccess={handleSuccessPayment}
            />
          )}
        </ListGroup.Item>
      )
    );
  };

  const handlePlaceOrder = () => {
    dispatch(createOrder(order));
  };

  const handleSuccessPayment = (paymentResult: object): void => {
    dispatch(payOrder(_id, paymentResult));
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order summary</h2>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total price of items</Col>
            <Col>${totalItemsPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>{shippingPrice === 0 ? 'Free shipping' : shippingPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax ({taxRate}%)</Col>
            <Col>${taxPrice}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        {switchToPaymentButton ? (
          addPayPalButton()
        ) : (
          <ListGroup.Item>
            <Button
              onClick={handlePlaceOrder}
              type='buton'
              variant='primary'
              className='btn-block'
              disabled={orderItems?.length === 0}
            >
              Place order
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default CartOrderSummary;
