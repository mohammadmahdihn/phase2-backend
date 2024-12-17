const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { users } = require('../models/data');
const router = express.Router();

router.post('/:username/follow', authenticateToken, authorizeRole('player'), (req, res) => {
    const { username } = req.params;
    const followerId = req.user.id;

    const userToFollow = users.find(user => user.username === username);
    if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
    }
    const follower = users.find(user => user.id === followerId);
    if (follower.username === username) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
    }
    if (follower.following && follower.following.includes(username)) {
        return res.status(400).json({ message: 'You are already following this user' });
    }
    if (!follower.following) {
        follower.following = [];
    }
    follower.following.push(userToFollow.id);
    res.status(200).json({ message: 'User followed successfully' });
});

router.get('/', authenticateToken, (req, res) => {
    const userList = users.map(user => ({
        id: user.id,
        username: user.username,
        role: user.role,
        following: user.following || []
    }));

    res.json(userList);
});

router.get('/:username', authenticateToken, (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const userInfo = {
        id: user.id,
        username: user.username,
        role: user.role,
        score: user.score || 0,
        following: user.following || []
    };
    res.json(userInfo);
});

module.exports = router;