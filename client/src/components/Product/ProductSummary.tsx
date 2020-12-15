import React, { useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

interface ProductSummaryProps {
  price: number;
  countInStock: number;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  price,
  countInStock,
}) => {
  const [quantity, setQuantity] = useState<string>('0');
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(e.target.value);

  const onSubmitHandler = () => {
    history.push(`/cart/${id}?quantity=${quantity}`);
  };

  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Row>
            <Col>Price:</Col>
            <Col>
              <strong>${price}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Status:</Col>
            <Col>
              <strong>{countInStock > 0 ? 'In stock' : 'Out of stock'}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        {countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>Quantity</Col>
              <Col>
                <Form.Control
                  as='select'
                  value={quantity}
                  onChange={onChangeHandler}
                >
                  {/* Turn countInStock into an iterable and render options */}
                  {[...Array(countInStock).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Button
            onClick={onSubmitHandler}
            disabled={countInStock === 0}
            className='btn-block'
            type='button'
          >
            Add to cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductSummary;
