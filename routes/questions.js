const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const Question = require('../models/Question');
const { questions } = require('../models/data');
const { v4: uuidv4 } = require('uuid');

router.post('/', authenticateToken, authorizeRole('designer'), (req, res) => {
    const { text, options, correctOption, difficulty, category } = req.body;
    questions.push(new Question(uuidv4(), text, options, correctOption, difficulty, category, [], req.user.id));
    res.status(201).json({ message: 'Question successfully created!' });
});

router.get('/', authenticateToken, (req, res) => {
    res.json(questions);
});

module.exports = router;
