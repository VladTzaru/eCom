import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

// Custom imports - PAGES
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/product/:id' component={ProductPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
