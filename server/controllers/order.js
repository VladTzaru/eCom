import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
const createNewOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    totalItemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lenght === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalItemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc     Create order by Id
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  // Get order and attach user name and email to it
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc     Update order payment status to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
const updateOrderPaymentStatusToPaid = asyncHandler(async (req, res) => {
  const { id, status, update_time } = req.body;

  // Get order and attach user name and email to it
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(402);
    throw new Error('Could not finalize the payment. Please try again');
  }
});

// @desc     Get all orders - logged in user
// @route    GET /api/orders/my-orders
// @access   Private
const getAllUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Could not fetch orders');
  }
});

export {
  createNewOrder,
  getOrderById,
  updateOrderPaymentStatusToPaid,
  getAllUserOrders,
};
