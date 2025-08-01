const express = require("express");
const router = express.Router();
const billingCtrl = require("../controller/billingController");

// Billing Endpoints
router.post("/", billingCtrl.createBilling);
router.put("/:appointmentId", billingCtrl.updateBilling);
router.get("/:appointmentId", billingCtrl.getBillingByAppointment);
router.get("/", billingCtrl.getBillingsByDateRange);

module.exports = router;
