import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', sessionRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('Arvyax backend is running...');
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || !process.env.JWT_SECRET) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `${req.originalUrl} route not found`,
  });
});
