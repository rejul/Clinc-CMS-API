const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });
const cors = require("cors");

const receptionistRoutes = require("./route/receptionistRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/receptionist", receptionistRoutes);

// Start server
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
