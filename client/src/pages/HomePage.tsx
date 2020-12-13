import React, { useEffect } from 'react';
import { RootStore } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../redux/actions/product/product';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootStore) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
