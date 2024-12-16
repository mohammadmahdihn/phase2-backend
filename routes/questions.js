const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const Question = require('../models/Question');
const { questions } = require('../models/data');

router.post('/', authenticateToken, authorizeRole('designer'), (req, res) => {
    const { id, text, options, correctOption, difficulty } = req.body;
    questions.push(new Question(id, text, options, correctOption, difficulty, req.user.id));
    res.status(201).json({ message: 'Question successfully created!' });
});

router.get('/', authenticateToken, (req, res) => {
    res.json(questions);
});

module.exports = router;
