import React from 'react';
import { ShippingI } from '../../customTypes';
import Message from '../Message';

interface UserAdressProps {
  isDelivered?: boolean;
  showNotification?: boolean;
  deliveredAt?: Date;
  shippingAddress?: ShippingI;
}

const UserAddress: React.FC<UserAdressProps> = ({
  shippingAddress,
  showNotification = false,
  isDelivered,
  deliveredAt,
}) => {
  const displayNotification = () =>
    isDelivered ? (
      <Message heading='Delivery status' variant='success'>
        Delivered on {deliveredAt}
      </Message>
    ) : (
      <Message variant='danger' heading='Delivery status'>
        Not delivered
      </Message>
    );

  return (
    <>
      <p>
        <strong>Full address: </strong> <span>{shippingAddress?.address}</span>,{' '}
        <span>{shippingAddress?.city}</span>,{' '}
        <span>{shippingAddress?.postalCode}</span>,{' '}
        <span>{shippingAddress?.country}</span>
      </p>
      {showNotification && displayNotification()}
    </>
  );
};

export default UserAddress;
