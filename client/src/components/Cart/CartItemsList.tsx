import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Message from '../Message';
import { removeFromCart, addToCart } from '../../redux/actions/cart/cart';
import { CartProductI } from '../../customTypes';
import { Row, Col, ListGroup, Button, Form, Image } from 'react-bootstrap';

interface CartItemsListProps {
  cartItems?: CartProductI[];
  unhideControls?: boolean;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  unhideControls = false,
  cartItems,
}) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id: string): void => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      {cartItems && cartItems.length === 0 ? (
        <Message heading='Your cart is empty'>
          <Link to='/'>Go to Home</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {cartItems &&
            cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image fluid rounded alt={item.name} src={item.image} />
                  </Col>
                  <Col md={!unhideControls ? 5 : 3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  {!unhideControls && (
                    <Col md={3}>
                      {item.quantity} {item.quantity === 1 ? 'unit' : 'units'} *{' '}
                      {item.price}
                    </Col>
                  )}

                  <Col md={2}>${(item.price * item.quantity).toFixed(2)}</Col>

                  {unhideControls && (
                    <Col md={3}>
                      <Form.Control
                        disabled={!unhideControls}
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
                  )}
                  {unhideControls && (
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash' />
                      </Button>
                    </Col>
                  )}
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
    </>
  );
};

export default CartItemsList;
