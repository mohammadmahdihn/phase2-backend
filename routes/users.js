const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { users } = require('../models/data');
const router = express.Router();

router.post('/:username/follow', authenticateToken, authorizeRole('player'), (req, res) => {
    const { username } = req.params;
    const followerId = req.user.id;

    const userToFollow = users.find(user => user.id === username);
    if (!userToFollow) {
        return res.status(404).json({ message: 'User not found' });
    }
    const follower = users.find(user => user.username === followerId);
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

module.exports = router;