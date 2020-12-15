import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Message from './Message';
import { removeFromCart, addToCart } from '../redux/actions/cart/cart';
import { CartProductI } from '../customTypes';
import { Row, Col, ListGroup, Button, Form, Image } from 'react-bootstrap';

interface CartItemsListProps {
  cartItems: CartProductI[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id: string): void => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <Message heading='Your cart is empty'>
          <Link to='/'>Go to Home</Link>
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
                      dispatch(addToCart(item.product, Number(e.target.value)))
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
    </>
  );
};

export default CartItemsList;
