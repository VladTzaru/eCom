import React, { useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../redux/store';
import { MatchParamsI } from '../customTypes';
import { RouteComponentProps } from 'react-router-dom';
import { getOrderDetails } from '../redux/actions/order/order';
import Loader from '../components/Loader';
import Message from '../components/Message';

interface OrderPageProps extends RouteComponentProps<MatchParamsI> {}

const OrderPage: React.FC<OrderPageProps> = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, orderItems, shippingAddress } = useSelector(
    (state: RootStore) => state.orderDetails
  );

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <></>
  );
};

export default OrderPage;
