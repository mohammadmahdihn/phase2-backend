const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { users } = require('../models/data');
const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const players = users.filter(user => user.role === 'player');
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    res.json(sortedPlayers.map(user => ({
        username: user.username,
        score: user.score
    })));
});

module.exports = router;
