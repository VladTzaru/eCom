import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { OrderI } from '../../customTypes';
import { createOrder } from '../../redux/actions/order/order';

interface CartOrderSummaryProps {
  orderDetails: OrderI;
  taxRate: number;
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  orderDetails,
  taxRate,
}) => {
  const dispatch = useDispatch();
  const {
    orderItems,
    paymentMethod,
    totalItemsPrice,
    shippingPrice,
    shippingAddress,
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

  const handlePlaceOrder = () => {
    dispatch(createOrder(order));
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

        <ListGroup.Item>
          <Button
            onClick={handlePlaceOrder}
            type='buton'
            className='btn-block'
            disabled={orderItems.length === 0}
          >
            Place order
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartOrderSummary;
