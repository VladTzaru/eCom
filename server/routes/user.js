import express from 'express';
import { authUser, getUserProfile } from '../controllers/user.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/login').post(authUser);
router.route('/profile').get(validateUser, getUserProfile);

export default router;
