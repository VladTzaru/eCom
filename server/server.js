import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import Routes
import productRoutes from './routes/product.js';

dotenv.config();
connectDB();
const app = express();

// Mount routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`)
);
