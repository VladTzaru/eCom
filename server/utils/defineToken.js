import jwt from 'jsonwebtoken';

const defineToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

export default defineToken;
