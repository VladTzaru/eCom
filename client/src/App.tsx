import React from 'react';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

// Custom imports - PAGES
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
