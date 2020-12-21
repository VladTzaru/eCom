import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/user.js';
import { isAdmin, validateUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(validateUser, isAdmin, getAllUsers);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(validateUser, getUserProfile)
  .put(validateUser, updateUserProfile);

export default router;
