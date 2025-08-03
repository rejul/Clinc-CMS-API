// backend/controller/authController.js
const Staff = require('../model/admin/staff');
const jwt = require('jsonwebtoken');

console.log(process.env.JWT_SECRET);

// Registration function
exports.register = async (req, res) => {
   const { name, email, password, phone, roleId } = req.body;
    //Console
    console.log(req.body);
        if (!email.includes('@') ) {
        return res.status(400).json({ message: 'Invalid email format' });
    }   
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // Check if staff member already exists
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Staff member already exists' });
        }

        const newStaff = new Staff(req.body);

        await newStaff.save();
        res.status(201).json({ message: 'Staff member registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login function
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!email.includes('@') || password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password format' });
    }

    const staff = await Staff.findOne({ email: email });




    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const isMatch = await staff.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    //  Generate token
    const token = jwt.sign(
      { id: staff._id, 
        roleId: staff.roleId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return token and optional user info
    // Note: Do not return sensitive information like password
  

    res.status(200).json({
      message: 'Login successful',
      token,
      staff: {
        staffId: staff.staffId,
        name: staff.name,
        email: staff.email,
        roleId: staff.roleId
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

