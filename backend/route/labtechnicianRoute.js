const express = require("express");
const router = express.Router();
const controller = require("../controller/labtechnicianController");
const {
  labTestValidation,
  labTestResultValidation,
} = require("../validation/labtechnicianValidator");
const { validationResult } = require("express-validator");

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Lab Test Management
router.post(
  "/labtests",
  labTestValidation,
  handleValidationErrors,
  controller.addLabTest
);
router.put(
  "/labtests/:labTestId",
  labTestValidation,
  handleValidationErrors,
  controller.updateLabTest
);
router.get("/labtests/:labTestId", controller.getLabTestById);
router.get("/labtests", controller.listLabTests);
router.patch("/labtests/:labTestId/deactivate", controller.deactivateLabTest);

// Lab Test Prescription Management
router.post(
  "/labtests/results",
  labTestResultValidation,
  handleValidationErrors,
  controller.createLabTestResult
);
router.get("/labtests/results", controller.getLabTestResultsByDate);
router.get(
  "/labtests/results/appointment/:appointmentId",
  controller.getLabTestResultByAppointment
);
router.put(
  "/labtests/results/:labTestPrescriptionId",
  labTestResultValidation,
  handleValidationErrors,
  controller.recordLabTestResult
);
router.patch(
  "/labtests/:labTestPrescriptionId/deactivate",
  controller.deactivateLabTestPrescription
);

module.exports = router;
