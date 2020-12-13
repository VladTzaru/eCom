import React from 'react';
import Rating from '../Rating';
import { ListGroup } from 'react-bootstrap';
import { ProductI } from '../../types/Product';

interface ProductDescriptionProps {
  product: ProductI;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h3>{product.name}</h3>
      </ListGroup.Item>

      <ListGroup.Item>
        <h5>{product.category}</h5>
      </ListGroup.Item>

      <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </ListGroup.Item>

      <ListGroup.Item>${product.price}</ListGroup.Item>
      <ListGroup.Item>{product.description}</ListGroup.Item>
    </ListGroup>
  );
};

export default ProductDescription;
