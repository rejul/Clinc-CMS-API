
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Role = require('./model/admin/role');

// Load environment variables from .env file
dotenv.config();

const app = express();


// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});

//Routes
//================================================================
// Import routes

const receptionistRoutes = require('./route/receptionistRoute');
const adminRoutes = require('./route/adminRoute');
const doctorRoute = require('./route/doctorRoute');
const labtechnicianRoutes = require('./route/labtechnicianRoute'); // changed to camelCase for consistency
const pharmacistRoutes = require('./route/pharmacistRoute');
const authRoute = require('./route/authRoute');
const authMiddleware = require('./middleware/auth');
const auth = require('./middleware/auth');
const authorize = require('./middleware/authorize');





// Use receptionist routes 
//Open routes for testing
app.use('/authAPI', authRoute);

//Protected routes
app.use('/adminAPI',auth,authorize([1]), adminRoutes);
app.use('/receptionistAPI',auth,authorize([1,3]), receptionistRoutes);
app.use('/doctorAPI',auth,authorize([1,2]), doctorRoute);
app.use('/labtechnicianAPI',auth,authorize([1,4]), labtechnicianRoutes);
app.use('/pharmacistAPI',auth,authorize([1,5]), pharmacistRoutes);






//===============================================

// check env  and port
const PORT = process.env.PORT || 8000;

if (!process.env.PORT)
{
    console.error('PORT is not defined in .env file');
    process.exit(1); // Exit process with failure
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



//insert default roles
app.listen(PORT, async () => {
    await Role.insertDefaultRoles(); // Call the function to insert default roles
    console.log(`Server is running on port ${PORT}`);
});