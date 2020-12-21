import React from 'react';
import Message from '../Message';

interface UserPaymentMethodProps {
  paymentMethod?: string;
  showNotification?: boolean;
  paidAt?: Date;
  isPaid?: boolean;
}

const UserPaymentMethod: React.FC<UserPaymentMethodProps> = ({
  paymentMethod,
  showNotification = false,
  paidAt,
  isPaid,
}) => {
  const displayNotification = () =>
    isPaid ? (
      <Message heading='Payment status' variant='success'>
        Paid on {paidAt}
      </Message>
    ) : (
      <Message variant='danger' heading='Payment status'>
        Not paid
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
