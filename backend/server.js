const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { insertDefaultRoles } = require('./model/admin/role'); // 
const { insertSampleDoctors } = require('./model/admin/doctor'); // 

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import routes
const receptionistRoutes = require('./route/receptionistRoute');
const adminRoutes = require('./route/adminRoute');
const doctorRoute = require('./route/doctorRoute');
const labtechnicianRoutes = require('./route/labtechnicianRoute');
const pharmacistRoutes = require('./route/pharmacistRoute');
const authRoute = require('./route/authRoute');

const auth = require('./middleware/auth');
const authorize = require('./middleware/authorize');
const { errorHandler } = require('./middleware/errorHandler');

// Open routes
app.use('/authAPI', authRoute);

// Protected routes
app.use('/adminAPI', auth, authorize([1]), adminRoutes);
app.use('/receptionistAPI', auth, authorize([1, 3]), receptionistRoutes);
app.use('/doctorAPI', auth, authorize([1, 2]), doctorRoute);
app.use('/labtechnicianAPI', auth, authorize([1, 4]), labtechnicianRoutes);
app.use('/pharmacistAPI', auth, authorize([1, 5]), pharmacistRoutes);
//whoami route to check logged-in user
app.get('/whoami', auth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Get staff details with role information
    const Staff = require('./model/admin/staff');
    const staff = await Staff.findOne({ staffId: req.user.staffId }).populate({
      path: 'roleId',
      model: 'Role',
      localField: 'roleId',
      foreignField: 'roleId',
      justOne: true
    });

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({
      message: 'You are logged in as:',
      staffId: req.user.staffId,
      roleId: req.user.roleId,
      roleName: staff.roleId ? staff.roleId.name : 'Unknown',
      staffDetails: {
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        isActive: staff.isActive,
        createdAt: staff.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching staff details',
      error: error.message 
    });
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

//
// Start server
const PORT = process.env.PORT || 8000;

if (!process.env.PORT) {
    console.error('PORT is not defined in .env file');
    process.exit(1);
}

const startServer = async () => {
    try {
        await connectDB(); // Wait for DB connection
        await insertDefaultRoles(); // Insert default roles
        await insertSampleDoctors(); // Insert sample doctors
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
