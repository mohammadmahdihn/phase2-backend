const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const Answer = require('../models/Answer');
const { questions, answers } = require('../models/data');


router.post('/', authenticateToken, authorizeRole('player'), (req, res) => {
    const { questionId, selectedOption } = req.body;
    const question = questions.find((q) => q.id === questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isCorrect = question.correctOption === selectedOption;
    const answer = new Answer(questionId, req.user.id, selectedOption, isCorrect);
    answers.push(answer);
    res.json({ message: isCorrect ? 'Correct answer' : 'Wrong answer', isCorrect });
});

module.exports = router;
