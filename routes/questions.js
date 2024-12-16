const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const Question = require('../models/Question');
const { questions, categories } = require('../models/data');
const { v4: uuidv4 } = require('uuid');

router.post('/', authenticateToken, authorizeRole('designer'), (req, res) => {
    const { text, options, correctOption, difficulty, category, relatedQuestions } = req.body;
    if (!categories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category name' });
    }
    questions.push(new Question(uuidv4(), text, options, correctOption, difficulty, category, relatedQuestions, req.user.id));
    res.status(201).json({ message: 'Question successfully created!' });
});

router.get('/', authenticateToken, (req, res) => {
    const { category } = req.query;
    let filteredQuestions = questions;
    if (category) {
        filteredQuestions = questions.filter(q => q.category === category);
    }
    if (filteredQuestions.length === 0) {
        return res.status(404).json({ message: 'No questions found.' });
    }
    res.status(200).json(filteredQuestions);
});

router.get('/', authenticateToken, authorizeRole('player'), (req, res) => {
    if (questions.length === 0) {
        return res.status(404).json({ message: 'No questions available' });
    }
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    res.json({
        id: randomQuestion.id,
        text: randomQuestion.text,
        options: randomQuestion.options
    });
});


module.exports = router;
