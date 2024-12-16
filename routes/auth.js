const express = require('express');
const jwt = require('jsonwebtoken');
const { users } = require('../models/data');
const User = require('../models/User');
const router = express.Router();

const SECRET_KEY = 'secretKey';


router.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    if (users.find((u) => u.username === username)) {
        return res.status(400).json({ message: 'This user is already registered' });
    }

    const newUser = new User(users.length + 1, username, password, role);
    users.push(newUser);

    res.status(201).json({ message: 'Registered successfully', user: newUser });
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Wrong username or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
});


module.exports = router;
