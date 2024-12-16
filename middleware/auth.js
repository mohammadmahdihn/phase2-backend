const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretKey';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token does not exist' });

    try {
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
}

function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };