// backend/controller/authController.js
const Staff = require('../model/admin/staff');
const jwt = require('jsonwebtoken');


// Registration function
exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Staff member already exists' });
        }

        const newStaff = new Staff({ name, email, phone, password });
        await newStaff.save();
        res.status(201).json({ message: 'Staff member registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login function][]
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const staff = await Staff.findOne({ email });
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        const isMatch = await staff.matchPassword(password); // use matchPassword method from staff model
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};