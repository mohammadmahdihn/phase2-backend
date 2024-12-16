const express = require('express');
const { categories } = require('../models/data');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticateToken, authorizeRole('designer'), (req, res) => {
    const { category } = req.body;
    if (!category) {
        return res.status(400).json({ message: 'Please enter a category!' });
    }
    if (categories.includes(category)) {
        return res.status(400).json({ message: 'Category already exists!' });
    }
    categories.push(category);
    res.status(201).json({ message: 'Category created!' });
});

module.exports = router;
