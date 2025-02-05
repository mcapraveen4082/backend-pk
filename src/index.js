const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const logger = require('./utils/logger');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (if using MongoDB)
mongoose.connect(process.env.MONGO_URI_WRITE)
  .then(() => {
    console.log("MongoDB connected");
    logger.info(`MongoDB connected`);
  })
  .catch((err) => console.log(err));

// Sample route
app.use('/ping', function(req,res){
  return res.send('Hello PK server running healthy!');
});
app.use('/api', require('./routes/api'));
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);  // Add this line

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

