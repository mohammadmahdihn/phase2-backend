const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const Answer = require('../models/Answer');
const { questions, answers, users } = require('../models/data');

router.post('/', authenticateToken, authorizeRole('player'), (req, res) => {
    const { questionId, selectedOption } = req.body;
    const question = questions.find((q) => q.id === questionId);
    if (!question) {
        return res.status(404).json({ message: 'Question not found' });
    }
    const existingAnswer = answers.find(
        (a) => a.questionId === questionId && a.playerId === req.user.id
    );
    if (existingAnswer) {
        return res.status(400).json({ message: 'You have already answered this question.' });
    }
    const isCorrect = question.correctOption === selectedOption;
    const answer = new Answer(questionId, req.user.id, selectedOption, isCorrect);
    const user = users.find((u) => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (isCorrect) {
        user.score += 3;
    } else {
        user.score -= 1;
    }
    answers.push(answer);

    res.json({ message: isCorrect ? 'Correct answer' : 'Wrong answer', isCorrect });
});

module.exports = router;
