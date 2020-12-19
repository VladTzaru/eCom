import express from 'express';
import { createNewOrder, getOrderById } from '../controllers/order.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(validateUser, createNewOrder);
router.route('/:id').get(validateUser, getOrderById);
export default router;
