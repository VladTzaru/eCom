import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// @desc     Auth user and get token
// @route    GET /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
});

export { authUser };
