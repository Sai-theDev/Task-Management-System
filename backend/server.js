const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS for frontend
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Use a strong secret from `.env`
    resave: false,
    saveUninitialized: true,
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport Configuration
require('./config/passport'); // Import Google strategy configuration

// Routes
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const alertRoutes = require('./routes/alertRoutes');
const authRoutes = require('./routes/authRoutes'); // New Auth Routes for Google SSO

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/auth', authRoutes); // Add auth routes for SSO

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
