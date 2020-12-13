import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface MessageProps {
  variant?: string;
  children: React.ReactNode;
  visible: boolean;
  heading?: string;
  showButton?: boolean;
  buttonText?: string;
}

const Message: React.FC<MessageProps> = ({
  visible = false,
  variant = 'info',
  showButton = false,
  children,
  buttonText = "Close me y'all!",
  heading = 'Oh snap! You got an error!',
}) => {
  const [show, setShow] = useState(visible);
  if (show)
    return (
      <Alert onClose={() => setShow(false)} dismissible variant={variant}>
        <Alert.Heading>{heading}</Alert.Heading>
        {children}
        {showButton && (
          <>
            <hr />
            <div className='d-flex justify-content-end'>
              <Button onClick={() => setShow(false)} variant='secondary'>
                {buttonText}
              </Button>
            </div>
          </>
        )}
      </Alert>
    );
  return null;
};

export default Message;
