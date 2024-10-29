require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection failed:', error));

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create User Model
const User = mongoose.model('User', UserSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

// Log current working directory and environment variables for debugging
console.log('Current working directory:', process.cwd());
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Rate limit for login and register routes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
});

// Login route
app.post('/login', loginLimiter, async (req, res) => {
    const { email, password } = req.body;
  
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      console.log('Attempting to login with email:', email); // Log email for debugging
      const user = await User.findOne({ email });
  
      // Check if user exists and log the user document
      if (user) {
        console.log('User found:', user); // Log the user document
  
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch); // Log the password comparison result
  
        if (isMatch) {
          const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({ message: 'Login Successful', token });
        }
      }
  
      return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
      console.error(error);
    }
  });
  
  // Registration route
  app.post('/register', registerLimiter, [
    body('name').isString().withMessage('Name must be a string'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ], async (req, res) => {
    const { name, email, password } = req.body;
  
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed Password:', hashedPassword); // Log hashed password for debugging
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error accessing the database', error: error.message });
      console.error(error);
    }
  });
  