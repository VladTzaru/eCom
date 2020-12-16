import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/user.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(validateUser, getUserProfile);

export default router;
