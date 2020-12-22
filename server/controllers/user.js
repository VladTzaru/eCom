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
    throw new Error('Invalid email or password');
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
      'Could not create user. Check your input data and try again'
    );
  }
});

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  const foundUser = await User.findById(user._id);

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

// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;

  if (!req.body.confirmPassword) {
    res.status(400);
    throw new Error('Confirm password');
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400);
    throw new Error('Passwords must match');
  }

  const foundUser = await User.findById(user._id);

  if (foundUser) {
    foundUser.name = req.body.name || foundUser.name;
    foundUser.email = req.body.email || foundUser.email;
    if (req.body.password) foundUser.password = req.body.password;

    const updatedUser = await foundUser.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: defineToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc     Get users
// @route    GET /api/users
// @access   Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  } else {
    res.status(500);
    throw new Error('Could not fetch all users');
  }
});

// @desc     Get a user by ID
// @route    GET /api/users/:id
// @access   Private (Admin)
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc     Update user profile
// @route    PUT /api/users/:id
// @access   Private (Admin)
const updateUser = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.params.id);

  if (foundUser) {
    foundUser.name = req.body.name || foundUser.name;
    foundUser.email = req.body.email || foundUser.email;
    foundUser.isAdmin = req.body.isAdmin;
    if (req.body.password) foundUser.password = req.body.password;

    const updatedUser = await foundUser.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc     Delete a user
// @route    DELETE /api/users/:id
// @access   Private (Admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
};
