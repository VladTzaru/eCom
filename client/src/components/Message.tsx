import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

interface MessageProps {
  variant?: string;
  children: React.ReactNode;
  visible: boolean;
}

const Message: React.FC<MessageProps> = ({
  visible = false,
  variant = 'info',
  children,
}) => {
  const [show, setShow] = useState(visible);
  if (show)
    return (
      <Alert onClose={() => setShow(false)} dismissible variant={variant}>
        {children}
      </Alert>
    );
  return null;
};

export default Message;
