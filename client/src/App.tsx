import React from 'react';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Hi there</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
