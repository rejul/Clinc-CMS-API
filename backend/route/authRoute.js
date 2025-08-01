// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Use the same secret key

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};