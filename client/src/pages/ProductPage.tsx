import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../redux/store';
import { Col, Image, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import ProductDescription from '../components/Product/ProductDescription';
import ProductSummary from '../components/Product/ProductSummary';
import { productDetails } from '../redux/actions/product/product';
import Loader from '../components/Loader';
import Message from '../components/Message';

interface MatchParams {
  name: string;
  id: string;
}

interface ProductPageProps extends RouteComponentProps<MatchParams> {}

const ProductPage: React.FC<ProductPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootStore) => state.productDetails
  );
  useEffect(() => {
    dispatch(productDetails(match.params.id));
  }, [dispatch, match.params.id]);
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          <p>{error}</p>
        </Message>
      ) : (
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
      )}
    </>
  );
};

export default ProductPage;
