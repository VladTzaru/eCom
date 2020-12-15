import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link, RouteComponentProps } from 'react-router-dom';
import { addToCart } from '../redux/actions/cart/cart';
import { MatchParamsI } from '../customTypes';
import { RootStore } from '../redux/store';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

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

  const removeFromCartHandler = (id: string): void => {
    console.log(id);
  };

  const checkoutHandler = (): void => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={7}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message showButton>
            Your cart is empty. <Link to='/'>Go to Home</Link>{' '}
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image fluid rounded alt={item.name} src={item.image} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {/* Turn countInStock into an iterable and render options */}
                      {[...Array(item.countInStock).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={3}>
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

      <Col md={2}></Col>
    </Row>
  );
};

export default CartPage;
