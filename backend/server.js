const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { onRequest } = require('firebase-functions/v2/https');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const testRoutes = require('./routes/testRoutes'); // Added for testing

// API Routes
app.use('/api/users', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/test', testRoutes); // Mount testing routes

// Basic route
app.get('/', (req, res) => {
  res.send('Royal Presidency Backend API is running...');
});

// Error Middleware
app.use(errorHandler);

// Port from .env
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

// Export the Firebase Function
// Trigger Redeployment (Firebase Auth Break Injection: authentic)
console.log("Firebase Redeploy Trigger: " + Date.now());
const CACHE_BREAKER_AUTH = "authentic_push";
exports.api = onRequest({ region: "us-central1" }, app);
