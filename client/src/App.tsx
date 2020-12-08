import React from 'react';

// Custom imports - COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Hi there</h1>
      </main>
      <Footer />
    </>
  );
};

export default App;
