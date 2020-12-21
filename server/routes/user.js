import express from 'express';
import {
  authUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/user.js';
import validateUser from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/').get(validateUser, getAllUsers);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(validateUser, getUserProfile)
  .put(validateUser, updateUserProfile);

export default router;
