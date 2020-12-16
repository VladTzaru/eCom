import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';

// Import Routes
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';

// Config
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`)
);
