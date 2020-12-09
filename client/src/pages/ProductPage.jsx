import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { products } from '../products';
import ProductDescription from '../components/Product/ProductDescription';
import ProductSummary from '../components/Product/ProductSummary';

interface MatchParams {
  name: string;
}

interface ProductPageProps extends RouteComponentProps<MatchParams> {}

const ProductPage: React.FC<ProductPageProps> = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={5}>
          <Image fluid src={product.image} alt={product.name} />
        </Col>

        <Col md={4}>
          <ProductDescription product={product} />
        </Col>

        <Col md={3}>
          <ProductSummary
            price={product.price}
            countInStock={product.countInStock}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
