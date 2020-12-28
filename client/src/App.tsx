import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

// Custom imports - PAGES
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/checkout/ShippingPage';
import PaymentPage from './pages/checkout/PaymentMethodPage';
import PlaceOrderPage from './pages/checkout/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/checkout/CartPage';
import UsersList from './pages/admin/UsersList';

// Admin routes
import AdminRoute from './components/Routes/AdminRoute';
import UserEdit from './pages/admin/UserEdit';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/checkout/shipping' component={ShippingPage} />
            <Route path='/checkout/payment' component={PaymentPage} />
            <Route path='/checkout/place-order' component={PlaceOrderPage} />
            <Route path='/order/:id' component={OrderPage} />
            <Route path='/cart/:id?' component={CartPage} />

            <AdminRoute path='/admin/users-list' component={UsersList} />
            <AdminRoute path='/admin/user/:id/edit' component={UserEdit} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
