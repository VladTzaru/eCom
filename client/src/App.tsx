import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

// Custom imports - PAGES
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/login' component={LoginPage} exact />
            <Route path='/product/:id' component={ProductPage} />
            <Route path='/cart/:id?' component={CartPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
