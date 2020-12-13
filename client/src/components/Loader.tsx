import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoaderProps {
  variant: string;
}

const Loader: React.FC<LoaderProps> = ({ variant }) => {
  return (
    <Spinner
      variant={variant}
      animation='border'
      role='status'
      style={{
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
