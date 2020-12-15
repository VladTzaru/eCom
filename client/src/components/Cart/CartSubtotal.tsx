import React from 'react';
import { ListGroup, Button, Card } from 'react-bootstrap';
import { CartProductI } from '../../customTypes';
import { History } from 'history';

interface CartSubtotalProps {
  cartItems: CartProductI[];
  history: History;
}
const CartSubtotal: React.FC<CartSubtotalProps> = ({ cartItems, history }) => {
  const checkoutHandler = (): void => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>
            Subotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            items
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
  );
};

export default CartSubtotal;
