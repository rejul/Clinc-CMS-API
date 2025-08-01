
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();


// Middleware to parse JSON requests
app.use(express.json());


// Connect to MongoDB
connectDB();

// Define a simple route
app.get('/', (req, res) => {
    res.send('API is running...');
});
//================================================================
// Import routes

const receptionistRoutes = require('./route/receptionistRoute');
const adminRoutes = require('./route/adminRoute');
const doctorRoute = require('./route/doctorRoute');
const labtechnicianRoutes = require('./route/labtechnicianRoute'); // changed to camelCase for consistency
const pharmacistRoutes = require('./route/pharmacistRoute');





// Use receptionist routes
app.use('/api/admin', adminRoutes);
app.use('/receptionistAPI', receptionistRoutes);
app.use('/doctorAPI', doctorRoute);
app.use('/labtechnicianAPI', labtechnicianRoutes);
app.use('/pharmacistAPI', pharmacistRoutes);






//===============================================

// Start the server
const PORT = process.env.PORT || 8000;

if (!process.env.PORT)
{
    console.error('PORT is not defined in .env file');
    process.exit(1); // Exit process with failure
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});