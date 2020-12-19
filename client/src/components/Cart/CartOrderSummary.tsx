import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { CartProductI } from '../../customTypes';
import {
  calculateTotalCartItemsPrice,
  calculateShippingCost,
  calculateTax,
  calculateTotalPrice,
} from '../../utils/utils';

interface CartOrderSummaryProps {
  cartItems: CartProductI[];
}

const CartOrderSummary: React.FC<CartOrderSummaryProps> = ({ cartItems }) => {
  // Calculations
  const totalItemsPrice = calculateTotalCartItemsPrice(cartItems);
  const totalShippingCost = calculateShippingCost(totalItemsPrice);
  const taxRate = 25;
  const tax = calculateTax(taxRate, totalItemsPrice);
  const totalPrice = calculateTotalPrice(
    totalItemsPrice,
    totalShippingCost,
    tax
  );

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
