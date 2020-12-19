import React, { useEffect } from 'react';
import {
  calculateTotalCartItemsPrice,
  calculateShippingCost,
  calculateTax,
  calculateTotalPrice,
} from '../../utils/utils';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartItemsList from '../../components/Cart/CartItemsList';
import CartOrderSummary from '../../components/Cart/CartOrderSummary';
import CheckoutSteps from '../../components/CheckoutSteps';
import { RootStore } from '../../redux/store';
import { MatchParamsI, OrderI } from '../../customTypes';
import { RouteComponentProps } from 'react-router-dom';
import UserAddress from '../../components/User/UserAddress';
import UserPaymentMethod from '../../components/User/UserPaymentMethod';

interface PlaceOrderPageProps extends RouteComponentProps<MatchParamsI> {}

const PlaceOrderPage: React.FC<PlaceOrderPageProps> = ({ history }) => {
  const { cartItems } = useSelector((state: RootStore) => state.cart);
  const { shippingInfo } = useSelector((state: RootStore) => state.shipping);
  const { selected } = useSelector((state: RootStore) => state.paymentMethod);
  const { success, order } = useSelector(
    (state: RootStore) => state.createdOrder
  );

  useEffect(() => {
    if (order && success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history, order]);

  // Calculations
  const totalItemsPrice = calculateTotalCartItemsPrice(cartItems);
  const shippingPrice = calculateShippingCost(totalItemsPrice);
  const taxRate = 25;
  const taxPrice = calculateTax(taxRate, totalItemsPrice);
  const totalPrice = calculateTotalPrice(
    totalItemsPrice,
    shippingPrice,
    taxPrice
  );

  const orderDetails: OrderI = {
    paymentMethod: selected,
    taxPrice,
    totalItemsPrice,
    totalPrice,
    shippingPrice,
    shippingAddress: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      postalCode: shippingInfo.postalCode,
      country: shippingInfo.country,
    },
    orderItems: cartItems,
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <UserAddress shippingAddress={shippingInfo} />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method</h2>
              <UserPaymentMethod paymentMethod={selected} />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order items</h2>
              <CartItemsList cartItems={cartItems} />
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <CartOrderSummary taxRate={taxRate} orderDetails={orderDetails} />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
