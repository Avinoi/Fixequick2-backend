const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user data (replace with real database logic)
let users = [];

// Register route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the user exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role,
  };

  // Save the user
  users.push(newUser);

  // Generate a token
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, 'your-secret-key', { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  // Find the user
  const user = users.find(user => user.email === email && user.role === role);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate token
  const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ message: 'Logged in successfully', token });
});

module.exports = router;
