import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { addToCart } from '../redux/actions/cart/cart';
import { MatchParamsI } from '../customTypes';
import { RootStore } from '../redux/store';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import CartItemsList from '../components/CartItemsList';

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

  const checkoutHandler = (): void => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        <CartItemsList cartItems={cartItems} />
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Go to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
