import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

interface ProductSummaryProps {
  price: number;
  countInStock: number;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  price,
  countInStock,
}) => {
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

        <ListGroup.Item>
          <Button
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
