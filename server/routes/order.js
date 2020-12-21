import express from 'express';
import {
  createNewOrder,
  getOrderById,
  updateOrderPaymentStatusToPaid,
  getAllUserOrders,
} from '../controllers/order.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(validateUser, createNewOrder);
router.route('/:id').get(validateUser, getOrderById);
router.route('/:id/pay').put(validateUser, updateOrderPaymentStatusToPaid);
router.route('/my-orders').get(validateUser, getAllUserOrders);
export default router;
