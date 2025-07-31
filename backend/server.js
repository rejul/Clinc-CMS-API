const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");

const patientRoutes = require("./route/receptionist/patientRoutes");
const appointmentRoutes = require("./route/receptionist/appointmentRoutes");
const billingRoutes = require("./route/receptionist/billingRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/billing", billingRoutes);

// Start server
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
