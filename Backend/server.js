const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

// Initialize Express app
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173','https://pmt-backend-dlg7.onrender.com'], // Allow requests from the frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true, // Allow cookies or authentication tokens to be sent
};


// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB Connected'))
.catch((error) => console.error(' MongoDB Connection Error:', error));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoutes);  

// Default route
app.get('/', (req, res) => {
  res.send('Project Management System API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
