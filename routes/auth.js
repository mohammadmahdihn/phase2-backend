const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/data');
const User = require('../models/User');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const SECRET_KEY = 'secretKey';

// Log the initialization of the router
console.log("User router initialized");

router.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    console.log("Received registration request:", { username, role });

    // Check if the user already exists
    if (users.find((u) => u.username === username)) {
        console.log("Registration failed: Username already exists");
        return res.status(400).json({ message: 'This user is already registered' });
    }

    // Register the new user
    const newUser = new User(uuidv4(), username, password, role);
    users.push(newUser);

    console.log("User registered successfully:", newUser);
    res.status(201).json({ message: 'Registered successfully', user: newUser });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("Received login request:", { username });

    // Authenticate user
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        console.log("Login failed: Invalid username or password");
        return res.status(401).json({ message: 'Wrong username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    console.log("Login successful, token generated for user:", { username, role: user.role });

    res.json({ message: 'Logged in successfully', role: user.role, token});
});

module.exports = router;
