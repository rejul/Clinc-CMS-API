// backend/route/authRoute.js
const express = require('express');
const { register, login } = require('../controller/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Auth API is running...');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;