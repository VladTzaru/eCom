import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { addToCart } from '../redux/actions/cart/cart';
import { MatchParamsI } from '../customTypes';
import { RootStore } from '../redux/store';
import { Row, Col } from 'react-bootstrap';
import CartItemsList from '../components/Cart/CartItemsList';
import CartSubtotal from '../components/Cart/CartSubtotal';

interface CartPageProps extends RouteComponentProps<MatchParamsI> {}

const CartPage: React.FC<CartPageProps> = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootStore) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        <CartItemsList cartItems={cartItems} />
      </Col>

      <Col md={4}>
        <CartSubtotal cartItems={cartItems} history={history} />
      </Col>
    </Row>
  );
};

export default CartPage;
