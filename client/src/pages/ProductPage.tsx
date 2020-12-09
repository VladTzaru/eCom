import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import ProductDescription from '../components/Product/ProductDescription';
import ProductSummary from '../components/Product/ProductSummary';
import { IProduct } from '../products';

interface MatchParams {
  name: string;
  id: string;
}

interface Product extends IProduct {
  image: string;
  name: string;
  price: number;
  countInStock: number;
}

interface ProductPageProps extends RouteComponentProps<MatchParams> {}

const ProductPage: React.FC<ProductPageProps> = ({ match }) => {
  const [product, setProduct] = useState<Product>(Object); // Temporary fix for empty object

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      const { data } = await Axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match.params.id]);
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
