const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pharmacistRoutes = require("./route/pharmacistRoutes");
const labTechnicianRoutes = require("./route/labtechnicianRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit on failure
  });

// Default Route
app.get("/", (req, res) => {
  res.send("Clinic CMS API is running...");
});

// Pharmacist Routes
app.use("/api/pharmacist", pharmacistRoutes);

// Lab Technician Routes
app.use("/api/labtechnician", labTechnicianRoutes);

// PORT
const PORT = process.env.PORT || 8000;

if (!process.env.PORT) {
  console.error("❌ PORT is not defined in .env file");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
