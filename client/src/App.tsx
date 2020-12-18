import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

// Custom imports - PAGES
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentMethodPage';
import CartPage from './pages/CartPage';

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
            <Route path='/cart/:id?' component={CartPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
