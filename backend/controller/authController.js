// backend/controller/authController.js
const Staff = require('../model/admin/staff'); // Import the Staff model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'your_secret_key'; // Use a strong secret key

// Registration function
exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Check if the staff member already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Staff member already exists' });
        }

        // Create a new staff member
        const newStaff = new Staff({
            name,
            email,
            phone,
            password, // Password will be hashed in the model
        });

        // Save the staff member to the database
        await newStaff.save();

        res.status(201).json({ message: 'Staff member registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await staff.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const token = jwt.sign({ id: staff._id }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};