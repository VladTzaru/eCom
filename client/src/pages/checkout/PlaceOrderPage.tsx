import React from 'react';
import {
  calculateTotalCartItemsPrice,
  calculateShippingCost,
  calculateTax,
  calculateTotalPrice,
} from '../../utils/utils';
import { Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsList from '../../components/Cart/CartItemsList';
import CheckoutSteps from '../../components/CheckoutSteps';
import { RootStore } from '../../redux/store';

const PlaceOrderPage = () => {
  const { cartItems } = useSelector((state: RootStore) => state.cart);
  const { shippingInfo } = useSelector((state: RootStore) => state.shipping);
  const { selected } = useSelector((state: RootStore) => state.paymentMethod);

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
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Full address: </strong>
                {Object.values(shippingInfo).map((v, i) => (
                  <span key={i}>{v}, </span>
                ))}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Selected: </strong>
                {selected}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              <CartItemsList cartItems={cartItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
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
                    {totalShippingCost === 0
                      ? 'Free shipping'
                      : totalShippingCost}
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
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
