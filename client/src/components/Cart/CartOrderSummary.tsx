import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { OrderDataI } from '../../customTypes';

interface CartOrderSummaryProps {
  orderDetails: OrderDataI;
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({
  orderDetails,
}) => {
  const {
    cartItems,
    totalItemsPrice,
    totalShippingCost,
    shippingAddress,
    taxRate,
    tax,
    totalPrice,
  } = orderDetails;
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
            <Col>
              {totalShippingCost === 0 ? 'Free shipping' : totalShippingCost}
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Tax ({taxRate}%)</Col>
            <Col>${tax}</Col>
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
            type='buton'
            className='btn-block'
            disabled={cartItems.length === 0}
          >
            Place order
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartOrderSummary;
