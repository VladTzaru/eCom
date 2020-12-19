import React from 'react';

import { Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CartItemsList from '../../components/Cart/CartItemsList';
import CartOrderSummary from '../../components/Cart/CartOrderSummary';
import CheckoutSteps from '../../components/CheckoutSteps';
import { RootStore } from '../../redux/store';

const PlaceOrderPage = () => {
  const { cartItems } = useSelector((state: RootStore) => state.cart);
  const { shippingInfo } = useSelector((state: RootStore) => state.shipping);
  const { selected } = useSelector((state: RootStore) => state.paymentMethod);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Full address: </strong>{' '}
                <span>{shippingInfo.address}</span>,{' '}
                <span>{shippingInfo.city}</span>,{' '}
                <span>{shippingInfo.postalCode}</span>,{' '}
                <span>{shippingInfo.country}</span>
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
          <CartOrderSummary cartItems={cartItems} />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
