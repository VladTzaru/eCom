import React from 'react';
import Message from '../Message';

interface UserPaymentMethodProps {
  paymentMethod?: string;
  showNotification?: boolean;
  payedAt?: Date;
  isPayed?: boolean;
}

const UserPaymentMethod: React.FC<UserPaymentMethodProps> = ({
  paymentMethod,
  showNotification = false,
  payedAt,
  isPayed,
}) => {
  const displayNotification = () =>
    isPayed ? (
      <Message heading='Payment status' variant='success'>
        Payed on {payedAt}
      </Message>
    ) : (
      <Message variant='danger' heading='Payment status'>
        Not payed
      </Message>
    );

  return (
    <>
      <p>
        <strong>Selected: </strong>
        {paymentMethod}
      </p>
      {showNotification && displayNotification()}
    </>
  );
};

export default UserPaymentMethod;
