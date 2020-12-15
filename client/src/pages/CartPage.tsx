import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, RouteComponentProps } from 'react-router-dom';
import { addToCart } from '../redux/actions/cart/cart';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

interface MatchParams {
  name: string;
  id?: string;
}

interface CartPageProps extends RouteComponentProps<MatchParams> {}

const CartPage: React.FC<CartPageProps> = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);
  return <h1>CART</h1>;
};

export default CartPage;
