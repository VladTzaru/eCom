import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// @desc     Auth user and get token
// @route    GET /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

export { authUser };
