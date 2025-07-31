const express = require("express");
const router = express.Router();
const billingCtrl = require("../../controller/receptionist/billingController");
const {
  validateBilling,
} = require("../../validation/receptionist/billingValidator");
const { runValidation } = require("../../validation/receptionist/Validate");

// Billing Endpoints
router.post("/", validateBilling, runValidation, billingCtrl.createBilling);
router.put(
  "/:appointmentId",
  validateBilling,
  runValidation,
  billingCtrl.updateBilling
);
router.get("/:appointmentId", billingCtrl.getBillingByAppointment);
router.get("/", billingCtrl.getBillingsByDateRange);

module.exports = router;
