import express from 'express';
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUser,
} from '../controllers/user.js';
import { isAdmin, validateUser } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(validateUser, isAdmin, getAllUsers);
router
  .route('/:id')
  .delete(validateUser, isAdmin, deleteUser)
  .get(validateUser, isAdmin, getUserById)
  .put(validateUser, isAdmin, updateUser);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(validateUser, getUserProfile)
  .put(validateUser, updateUserProfile);

export default router;
