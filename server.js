const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection
const mentorRoutes = require('./routes/mentor.routes'); // Mentor routes
const adminRoutes = require('./routes/admin.routes'); // Admin routes
const chatRoutes = require('./routes/chat.routes'); // Chat routes
const authRoutes = require('./routes/auth.routes'); // Auth routes

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/mentor', mentorRoutes); // Mentor-related routes
app.use('/api/admin', adminRoutes); // Admin-related routes
app.use('/api/chat', chatRoutes); // Chat-related routes
app.use('/api/auth', authRoutes); // Auth-related routes


// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running...'); // Send response
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message }); // Send response
});

// Start the server
const PORT = process.env.PORT || 443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message
});
