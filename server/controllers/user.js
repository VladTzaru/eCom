import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import defineToken from '../utils/defineToken.js';

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
      token: defineToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

// @desc     User registration
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: defineToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error(
      'Could not create user. Check your input data and try again.'
    );
  }
});

// @desc     Get user profile
// @route    POST /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  const foundUser = User.findById(user._id);

  if (foundUser) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser };
