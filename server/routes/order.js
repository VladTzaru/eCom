import express from 'express';
import { createNewOrder } from '../controllers/order.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(validateUser, createNewOrder);

export default router;
