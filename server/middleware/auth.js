import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import asyncHandler from 'express-async-handler';

const validateUser = asyncHandler(async (req, res, next) => {
  let token;

  const { headers } = req;
  if (headers.authorization && headers.authorization.startsWith('Bearer')) {
    try {
      token = headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Append DB user (without password) to req object
      req.user = await User.findById(decodedToken.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized.');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized.');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('You do not have Administrator access');
  }
};

export { validateUser, isAdmin };
